const ds = require("node-dataset");
const fs = require('fs');
const path = require("path");
const Movie = require("../models/movie_model");
const AWS =  require("aws-sdk");
const { S3 } = require("aws-sdk");
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const inputFile = path.resolve(__dirname, "../tmdb_5000_movies.csv");

// const dataset = new ds.DataSet(
//     "test",
//     "fips, county, state",
//     [
//       [45001, "Abbeville", "South Carolina"],
//       [22001, "Acadia", "Louisiana"],
//       [51001, "Accomack", "Virginia"],
//       [16001, "Ada", "Idaho"]
//     ]
//   );

const bucket_region = "bucket_region";
const bucket_name = "bucket_name";
const access_key = "key";
const secret_key = "secret_key";

const s3 = new S3({
    region: bucket_region,
    accessKeyId: access_key,
    secretAccessKey: secret_key
})

async function getFileStream() {
    const data = s3.getObject(
        {
            Bucket: "<<bucket_name>>",
            Key: "posters/1452.webp"
        }
    ).promise();
    return data;
}

//upload to aws s3 bucket
async function uploadImage(file){
    const fileStream =  fs.createReadStream(file.path);
    const uploadParams = {
        Bucket : "<<bucket_name>>",
        Body : fileStream,
        Key : "posters/"+file.filename,
        ContentType: "image/webp"
    }
    // console.log(url);

    return s3.upload(uploadParams, (err, data) => {
        if(err) {
            console.log(err);
        }else{
            console.log("success");
            // res.status(200).json({msg:"Uploaded to AWS"})
        }
    })
}

async function uploadVideo(file){
    const fileStream =  fs.createReadStream(file.path);
    const uploadParams = {
        Bucket : "<<bucket_name>>",
        Body : fileStream,
        Key : "trailers/"+file.filename,
        ContentType: "video/mp4",
    }

    return s3.upload(uploadParams, (err, data) => {
        if(err) {
            console.log(err);
        }else{
            console.log("success");
        }
    })
}


exports.addMovies = async(req,res) => {
    const dataset = new ds.DataSet().fromFile(inputFile, "csv");
    let movies_list = [];
    movies_list = ((await dataset).limit(15).toJSON());
    // movies_list.reverse();
    movies_list.map(async(movies) => {
        const movie = new Movie({
            title: movies.title,
            budget: movies.budget,
            runtime: movies.runtime,
            overview:movies.overview,
            genres: movies.genres,
            rating: movies.vote_average,
            language: movies.original_language,
            releaseDate: movies.release_date,
            production_companies: movies.production_companies
        });
        await movie.save()
    })
    res.status(200).json({msg:"Movies Added"});
}


exports.updatePoster = async(req,res) => {
    const imageUrl = `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/posters/${req.file.filename}`;
    // const fileStream =  fs.createReadStream(file.path);
    const file = req.file;
    // const params = {
    //     Bucket: "node-s3-angular",
    //     Key: "posters/"+file.filename
    // }
    // var url = s3.getSignedUrl("getObject", params);
    const imgResult = (await uploadImage(file)).promise;
    await unlinkFile(file.path);
    console.log(imgResult);

    Movie.updateOne(
        {_id:req.params.id},
        {
            poster: imageUrl
        },
        {multi: false},
        function(err, data){
            if(err){
                console.log(err);
            }else {
                console.log(data);
                res.status(200).json({msg:"Uploaded"})
            }
        }
    )
}

exports.updateTrailer = async(req,res) => {
    const videoUrl = `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/trailers/${req.file.filename}`;
    const file = req.file;
    const vidResult = (await uploadVideo(file)).promise;
    await unlinkFile(file.path);
    if(vidResult){
        res.status(200).json({msg:"Uploaded"});
    }
    console.log(vidResult);
    Movie.updateOne(
        {_id:req.params.id},
        {
            trailer: videoUrl
        },
        {multi: false},
        function(err, data){
            if(err){
                console.log(err);
            }else {
                console.log(data);
                // res.status(200).json({msg:"Uploaded"})
            }
        }
    )
}

exports.getMovieDetails = async(req,res) =>{
    Movie.findOne(
        {title:req.params.title},
        (err, data) => {
            if(err){
                res.status(404).json({msg:err})
            }else {
                console.log("Fetched");
                res.status(200).json(data);
            }
        }
    )
}

exports.getPopularList = async(req,res) => {
    Movie.find()
        .limit(5)
        .then((movie) => {
            if(!movie) {
                res.status(404).json({msg:"NO Data found"})
            }else {
                res.status(200).json(movie)
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getLatestList = async(req,res) => {
    Movie.find()
        .skip(5)
        .limit(5)
        .then((movie) => {
            if(!movie) {
                res.status(404).json({msg:"NO Data found"})
            }else {
                res.status(200).json(movie)
            }
        })
        .catch(err => {
            console.log(err);
        })
    // const dataset = new ds.DataSet().fromFile(inputFile, "csv");
    // console.log((await dataset).slice(11, 16).count());
    // res.status(200).json((await dataset).slice(11, 16).toJSON());
}
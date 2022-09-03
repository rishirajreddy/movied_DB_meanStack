# MoviesListAngular

This project is purely built on MEAN Stack. It is deployed in AWS Elastic BeanStalk EC2 instance Amazon Linux 2/5.5.6. Below is the link. <br>
## <a href="http://moviedbmean-env.eba-wnymz2ms.us-west-2.elasticbeanstalk.com/">Project Link</a>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `npm run start:server` to run the backend node server.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Dependencies Used

<ul>
    <li><b>express:</b> <span>a node js web application framework that provides broad features for building web and mobile applications</span></li>
    <li><b>mongoose:</b><span> a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.</span></li>
    <li><b>aws-sdk:</b><span> aws cli for using aws services</span></li>
    <li><b>multer:</b><span> for uploading/storing posters and trailers on <b>aws S3 bucket</b></span></li>
    <li><b>node-dataset:</b><span> for rendering the datasets in nodejs</span></li>
    <li><b>ngx-videogular:</b><span> npm package for angular with great video control features. Built on top of HTML5</span></li>
    <li><b>@angular/material:</b><span> used as frontend templates for the project which gives a lot of beautiful templates</span></li>
    <li><b>shimmer-css:</b><span> for shimmer effect while loading</span></li>
</ul>

## Thought Process

<ul>
    <li>
        First of all, a movies data-set called <b>TMDB</b> from Kaggle is used for the movie names <br>
        <a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata">Kaggle TMDB Dataset</a>
    </li>
    <li>
        After loading all the movies and its details, the posters and trailers needed to be uplaoded and fetched from a cloud source.
    </li>
    <li>
        <b>AWS S3 Bucket</b> is used here as storage for trailers and posters for the movies.
    </li>
    <li>
        For storing the trailers and posters, an end-point is been created at the backend in nodejs server. <b>/addPosters/:id</b> and <b>/addVideos/:id</b> <br>
    </li>
    <li>
        So, the posters and trailers are uploaded to the S3 bucket using these routes/end-points and are stored in mongoDB at the same time. <br>
        <b>Note:</b> The links to all the posters and trailers are stored to the particular movie in mongoDB. 
    </li>
    <li>
        And then, it is fetched from the S3 bucket to the client side.
    </li>
    <li>
        Coming to the trailers section, it is also fetched from the S3 bucket. And <b>@ngx-videogular</b> dependency is been used here for video playback in angular. <br>
        Trailers are played as soon as the user hits the <b>/movie/<movieName></b> end-point
    </li>
    <li>
        In the movie page, the movie details can be seen along with trailer in the overview section.
    </li>
</ul>

## Design Choices

<ul>
<li>Coming to design, Angular Material is been used here because it gives more flexibility and more beautiful UIs and templates</li> <br>
<li>And also it has a good documentation for its API.</li> <br>
<li>For the design, one of the Dribbles Movies UI is been used for the reference.</li>
</ul>

## For better optimization

<ul>
    <li>
        The queris for fetching the data from AWS S3 can be optimized using CloudFront Service in AWS. <br>
        It is used to stream images, video files, etc. for smooth user experience.
    </li>
    <li>
        Coming to design issues, the carousel effect of the movies list can be optimized further for better user experience.
    </li>
    <li>
        The video streaming can be optimized by using CloudFront Service from AWS. <br>
        The video player can have better controls using the <b>@ngx-videogular<b> module.
    </li>
    <li>
        The shimmering effect can be further more optimized for better user experience.
    </li>
</ul>

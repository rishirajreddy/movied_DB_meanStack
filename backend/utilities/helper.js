const { S3 } = require("aws-sdk");

const bucket_region = "us-west-2";
const bucket_name = "node-s3-angular";
const access_key = "AKIASTPLZLVQCRXYBVRI";
const secret_key = "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";

const s3 = new S3({
    bucket_region,
    access_key,
    secret_key
})


async function getFileStream() {
    const data = s3.getObject(
        {
            Bucket: "node-s3-angular",
            Key: "10764.webp"
        }
    ).promise();
    return data;
}


exports.getFileStream = getFileStream;
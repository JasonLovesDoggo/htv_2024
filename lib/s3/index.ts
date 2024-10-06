import AWS from "aws-sdk";

// Configure the AWS SDK to point to your MinIO instance
export const s3 = new AWS.S3({
  endpoint: "http://127.0.0.1:9000",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const params = {
  Bucket: "first-bucket",
};

s3.listObjects(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

export const listObjects = async () => {
  const data = await s3.listObjects(params).promise();

  return data.Contents;
};

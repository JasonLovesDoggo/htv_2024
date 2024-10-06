import AWS from "aws-sdk";

// Configure the AWS SDK to point to your MinIO instance
const s3 = new AWS.S3({
  endpoint: "http://127.0.0.1:9000", // MinIO URL
  accessKeyId: "minioadmin", // Your MinIO access key
  secretAccessKey: "minioadmin", // Your MinIO secret key
  s3ForcePathStyle: true, // Required for MinIO
  signatureVersion: "v4", // Required for MinIO
});

// List objects in the bucket
const params = {
  Bucket: "first-bucket", // The name of your bucket
};

s3.listObjects(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data); // Outputs JSON data with object info
  }
});

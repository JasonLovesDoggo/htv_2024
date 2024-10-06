import AWS from "aws-sdk";

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
  try {
    const data = await s3.listObjects(params).promise();
    return data.Contents as Object[];
  } catch (error) {
    console.error("Error listing objects:", error);
    return [];
  }
};

export type Object = {
  Key: string;
  LastModified: Date;
  Size: number;
  ETag: string;
  StorageClass: string;
  Owner: Owner;
};

export type Owner = {
  DisplayName: string;
  ID: string;
};

export const deleteFile = async (key: string) => {
  try {
    await s3.deleteObject({ ...params, Key: key }).promise();
    console.log(`File ${key} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${key}:`, error);
    return false;
  }
};

export const renameFile = async (oldKey: string, newKey: string) => {
  try {
    // Copy the object to a new key
    await s3
      .copyObject({
        ...params,
        CopySource: `${params.Bucket}/${oldKey}`,
        Key: newKey,
      })
      .promise();

    // Delete the old object
    await deleteFile(oldKey);

    console.log(`File renamed from ${oldKey} to ${newKey} successfully`);
    return true;
  } catch (error) {
    console.error(`Error renaming file from ${oldKey} to ${newKey}:`, error);
    return false;
  }
};

export const getFileUrl = (key: string) => {
  return s3.getSignedUrl("getObject", {
    ...params,
    Key: key,
    Expires: 60 * 5,
  });
};

export const uploadFile = async (
  key: string,
  body: Buffer,
  contentType: string,
) => {
  try {
    await s3
      .putObject({
        ...params,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
      .promise();
    console.log(`File ${key} uploaded successfully`);
    return true;
  } catch (error) {
    console.error(`Error uploading file ${key}:`, error);
    return false;
  }
};

export const getFileMetadata = async (key: string) => {
  try {
    const metadata = await s3
      .headObject({
        ...params,
        Key: key,
      })
      .promise();
    return metadata;
  } catch (error) {
    console.error(`Error getting metadata for file ${key}:`, error);
    return null;
  }
};

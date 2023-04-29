import AWS from "aws-sdk";

const uploadImageToS3 = async (file: File | undefined) => {
  const awsAccessKey = process.env.NEXT_PUBLIC_MY_AWS_ACCESS_KEY as string;
  const awsSecretKey = process.env.NEXT_PUBLIC_MY_AWS_SECRET_KEY as string;
  const awsS3Bucket = process.env.NEXT_PUBLIC_MY_AWS_S3_BUCKET as string;
  const awsS3BucketRegion = process.env
    .NEXT_PUBLIC_MY_AWS_S3_BUCKET_REGION as string;

  AWS.config.update({
    region: awsS3BucketRegion,
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  });
  if (!file) return;
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: awsS3Bucket,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    },
  });
  const promise = upload.promise();
  const data = await promise;
  return data.Location;
};

export default uploadImageToS3;

import AWS from "aws-sdk";
import imageCompression from "browser-image-compression";

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
  const compressedFile = await compressFile(file);
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: awsS3Bucket,
      Key: compressedFile.name,
      Body: compressedFile,
      ContentType: compressedFile.type,
    },
  });
  const promise = upload.promise();
  const data = await promise;
  return data.Location;
};

function compressFile(file: File) {
  const options = {
    maxSizeMB: 1,
    maxWidth: 1024,
    useWebWorker: true, // js 싱글스레드가 아닌 별도 백그라운드 스레드에서 실행
  };
  return imageCompression(file, options);
}

export default uploadImageToS3;

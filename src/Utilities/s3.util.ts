import { s3 } from "../Configs/s3.config";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const BUCKET = process.env.AWS_BUCKET_NAME!;

export class S3Utils {
  static async upload(file: Express.Multer.File, folder: string) {
    const sanitizedFileName = file.originalname
      .trim()
      .replace(/\s+/g, "-")         
      .replace(/[^a-zA-Z0-9.\-_]/g, ""); 
    const key = `${folder}/${Date.now()}-${sanitizedFileName}`;

    const uploadParams = {
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    return {
      key,
      url: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
  }

  static async delete(key: string) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  }

  static async generatePresignedUrl(key: string, expiresIn = 3600) {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(s3, command, { expiresIn });
  }
}

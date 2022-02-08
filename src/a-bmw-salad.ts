import { randomUUID } from "crypto";

import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

import { AwsLambdaEvent, Env } from "./schemas";

const { S3_BUCKET } = Env.parse(process.env);

export const handler = async (event: unknown, context: unknown) => {
  const logline = { event, context };
  const result = {
    body: '{"message":"Created"}',
    headers: {
      "content-type": "application/json",
    },
    statusCode: 201,
  };

  try {
    const { body } = AwsLambdaEvent.parse(event);
    Object.assign(logline, { body });
    const s3Object = { id: randomUUID(), body };
    const input: PutObjectCommandInput = {
      Body: JSON.stringify(s3Object),
      Bucket: S3_BUCKET,
      Key: s3Object.id,
    };

    const cmd = new PutObjectCommand(input);
    await new S3Client({}).send(cmd);
    Object.assign(logline, { result });
    return result;
  } catch (error) {
    Object.assign(result, {
      body: '{"message":"Bad Request"}',
      statusCode: 400,
    });

    Object.assign(logline, { result, error: String(error) });
    return result;
  } finally {
    process.stdout.write(JSON.stringify(logline));
  }
};

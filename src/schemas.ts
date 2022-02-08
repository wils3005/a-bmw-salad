import { z } from "zod";

export type Env = z.infer<typeof Env>;
export const Env = z.object({
  S3_BUCKET: z.string(),
});

export type AwsLambdaEventHeaders = z.infer<typeof AwsLambdaEventHeaders>;
export const AwsLambdaEventHeaders = z.object({
  accept: z.string(),
  "content-length": z.string(),
  host: z.string(),
  "user-agent": z.string(),
  "x-amzn-trace-id": z.string(),
  "x-forwarded-for": z.string(),
  "x-forwarded-port": z.string(),
  "x-forwarded-proto": z.string(),
});

export type AwsLambdaEventRequestContext = z.infer<
  typeof AwsLambdaEventRequestContext
>;
export const AwsLambdaEventRequestContext = z.object({
  accountId: z.string(),
  apiId: z.string(),
  domainName: z.string(),
  domainPrefix: z.string(),
  http: z.object({
    method: z.string(),
    path: z.string(),
    protocol: z.string(),
    sourceIp: z.string(),
    userAgent: z.string(),
  }),
  requestId: z.string(),
  routeKey: z.string(),
  stage: z.string(),
  time: z.string(),
  timeEpoch: z.number().positive(),
});

export type AwsLambdaEvent = z.infer<typeof AwsLambdaEvent>;
export const AwsLambdaEvent = z.object({
  body: z.string().transform((s) => Buffer.from(s, "base64").toString()),
  headers: AwsLambdaEventHeaders,
  isBase64Encoded: z.boolean(),
  rawPath: z.string(),
  rawQueryString: z.string(),
  requestContext: AwsLambdaEventRequestContext,
  routeKey: z.string(),
  version: z.string(),
});

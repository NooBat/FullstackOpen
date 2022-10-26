import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URI: process.env.MONGODB_URI as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  NAMESPACE_SECRET: process.env.NAMESPACE_SECRET as string,
  PORT: process.env.PORT as string,
};

import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const { DB_HOST, DB_USERNAME, DB_PASSWORD ,DB_NAME} = process.env;

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
   username: DB_USERNAME,
   password: DB_PASSWORD,
   database: DB_NAME,
   host: DB_HOST,
   dialect: "mysql",
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  }
};

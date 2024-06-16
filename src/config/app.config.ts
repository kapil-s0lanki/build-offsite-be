import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  current_version: process.env.npm_package_version,
  query_timeout: process.env.QUERY_TIMEOUT || 5000,
  webURL: process.env.WEB_URL,
  db: {
    host: process.env.SQL_HOST || 'localhost',
    port: +process.env.SQL_PORT || 5432,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRES_IN || '1d',
    refreshToken_expiration: process.env.JWT_REFRESH_EXPIRES_IN || '1y',
    admin_access_token_secret: process.env.admin_access_token_secret,
    admin_refresh_token_secret:process.env.admin_refresh_token_secret
  },
}));

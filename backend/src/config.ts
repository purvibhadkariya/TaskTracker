//NODE
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development'

//JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'yo-its-a-secret';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d'
export const JWT_REFRESH_SECRET = process.env.jwtSecret || 'yo-its-a-secret';
export const JWT_REFRESH_EXPIRY = process.env.jwtRefreshExpiry || '30d'


//MONGO
export const DB_HOST = process.env.DB_HOST || '0.0.0.0';
export const DB_NAME = process.env.DB_NAME || 'test';
export const DB_USERNAME = process.env.DB_USERNAME || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_SOURCE = process.env.DB_SOURCE || 'admin';


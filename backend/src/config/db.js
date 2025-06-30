import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
/*
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD raw:', process.env.DB_PASSWORD);
console.log('DB_PASSWORD typeof:', typeof process.env.DB_PASSWORD); */

const password = String(process.env.DB_PASSWORD);  // Forzamos string explícitamente

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  password,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false 
  }
);

export default sequelize;
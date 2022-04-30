import { Pool } from "pg";
import { config } from 'dotenv';

config();

const DbPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default DbPool;

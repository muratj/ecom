import dotenv from 'dotenv';
import express from 'express';
import { readFileSync } from 'fs';
import { Pool } from 'pg';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const query = readFileSync('./tables.sql').toString();
(async () => {
  const pool = new Pool();
  const res = await pool.query(query);
  console.log(res);
})();

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

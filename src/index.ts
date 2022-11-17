import dotenv from 'dotenv';
import express from 'express';
import productRoute from './routes/product.route';
import helmet from 'helmet';
import { logger } from './middlewares/logger';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/api/products', productRoute);

app.listen(PORT, () => logger.info(`App is running on port ${PORT}`));

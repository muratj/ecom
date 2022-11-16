import dotenv from 'dotenv';
import express from 'express';
import productRoute from './routes/product.route';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/products', productRoute);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

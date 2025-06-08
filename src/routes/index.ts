import express from 'express';
import productsRouter from './product';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

export default app;

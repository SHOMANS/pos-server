import express from 'express';
import productsRouter from './product';
import ordersRouter from './orders';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;

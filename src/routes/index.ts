import express from 'express';
import productsRouter from './product';
import ordersRouter from './orders';
import authRouter from './auth';
import userRouter from './user';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;

import express from 'express';
import {
  checkoutOrder,
  getAllOrders,
  getOrderById,
  getOrdersByCustomer,
  deleteOrder,
} from '../controllers/order';
import { authGuard } from '../middlewares/guards/authGuard';

const router = express.Router();

router.use(authGuard);

router.post('/checkout', checkoutOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/customer/:customerId', getOrdersByCustomer);
router.delete('/:id', deleteOrder);

export default router;

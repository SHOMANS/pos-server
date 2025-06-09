import express from 'express';
import {
  checkoutOrder,
  getAllOrders,
  getOrderById,
  getOrdersByCustomer,
  deleteOrder,
} from '../controllers/order';

const router = express.Router();

router.post('/checkout', checkoutOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/customer/:customerId', getOrdersByCustomer);
router.delete('/:id', deleteOrder);

export default router;

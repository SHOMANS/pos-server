import { Router } from 'express';
import {
  getAllProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';
import { authMiddleware } from '../middlewares/guards/authGuard';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllProducts);
router.get('/:code', getProductByCode);
router.post('/', createProduct);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);

export default router;

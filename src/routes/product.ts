import { Router } from 'express';
import {
  getAllProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';
import { authGuard } from '../middlewares/guards/authGuard';

const router = Router();

router.use(authGuard);

router.get('/', getAllProducts);
router.get('/:code', getProductByCode);
router.post('/', createProduct);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);

export default router;

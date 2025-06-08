import { Router } from 'express';
import {
  getAllProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';

const router = Router();

router.get('/', getAllProducts);
router.get('/:code', getProductByCode);
router.post('/', createProduct);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);

export default router;

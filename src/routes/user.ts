import express from 'express';
import {
  changeUserPassword,
  editUserInfo,
  getAllUsers,
  getProfileInfo,
  getUserDetail,
} from '../controllers/user';
import { authGuard } from '../middlewares/guards/authGuard';

const router = express.Router();

router.use(authGuard);

router.get('/', getAllUsers);
router.get('/profile', getProfileInfo);
router.get('/:id', getUserDetail);
router.put('/:id', editUserInfo);
router.put('/:id/password', changeUserPassword);

export default router;

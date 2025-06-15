import express from 'express';
import { createAdminUser, login } from '../controllers/auth';

const router = express.Router();

router.post('/create-admin', createAdminUser);

router.post('/login', login);

export default router;

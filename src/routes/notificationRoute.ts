import express from 'express';
import { notificationController } from '../controllers/notificationController';

const router = express.Router();

router.post('/', notificationController);

export default router;

import express from 'express';
import { updateChannelController } from '../controllers/notificationController';

const router = express.Router();

router.post('/', updateChannelController);

export default router;

import { sendNotification, updateChannel } from '../services/notificationService';
import { validateChannel, validateNotifications } from './validation';
import {logger} from '../logger';
import { Request, Response } from 'express';

const notificationController = async (req: Request, res: Response) => {
  try {
    const validationResult = await validateNotifications(req);

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    // Optional 'platform' flag to choose which platform to send notification to 
    // If platform is null the default method is 'all()'
    const { message, platform=null } = req.body;
    const result = await sendNotification(message, platform);
    
    return result.success? res.status(200).json(result) : res.status(400).json(result);

  } catch (error: any) {
    logger.error(`Error in notificationController: ${error.message}`)
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const updateChannelController = async (req: Request, res: Response) => {
  try {
    const validationResult = await validateChannel(req);

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    // Optional 'platform' flag to choose which platform to send notification to 
    // If platform is null the default method is 'all()'
    const { newChannel, platform } = req.body;
    updateChannel(newChannel, platform);
    
    res.status(204).end();

  } catch (error: any) {
    logger.error(`Error in notificationController: ${error.message}`)
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


export {notificationController, updateChannelController};
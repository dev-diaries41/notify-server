import { check, validationResult } from "express-validator";


export const validateNotifications = async (req: any) => {
    try {
      await check('message').notEmpty().withMessage('Message is required').run(req);

      // Check for validation errors
      const validationCheck = validationResult(req);
      if (!validationCheck.isEmpty()) {
        return { success: false, error: validationCheck.array() };
    }
  
      return { success: true, message: 'Validation successful' };
    } catch (error: any) {
      console.error(`Error in validateNotifications: ${error.message}`);
      return { success: false, error: error.message };
    }
  };


export const validateChannel = async (req: any) => {
  try {
    await check('newChannel').notEmpty().withMessage('New channel is required').run(req);
    await check('platform').notEmpty().withMessage('Platform is required and must be either telegram or discord').run(req);

    // Check for validation errors
    const validationCheck = validationResult(req);
    if (!validationCheck.isEmpty()) {
      return { success: false, error: validationCheck.array() };
  }

  return { success: true, message: 'Validation successful'};
} catch (error: any) {
    console.error(`Error in validateNotifications: ${error.message}`);
    return { success: false, error: error.message };
  }
};

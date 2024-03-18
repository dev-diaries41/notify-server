"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChannelController = exports.notificationController = void 0;
const notificationService_1 = require("../services/notificationService");
const validation_1 = require("./validation");
const logger_1 = require("../logger");
const notificationController = async (req, res) => {
    try {
        const validationResult = await (0, validation_1.validateNotifications)(req);
        if (!validationResult.success) {
            return res.status(400).json(validationResult);
        }
        // Optional 'platform' flag to choose which platform to send notification to 
        // If platform is null the default method is 'all()'
        const { message, platform = null } = req.body;
        const result = await (0, notificationService_1.sendNotification)(message, platform);
        return result.success ? res.status(200).json(result) : res.status(400).json(result);
    }
    catch (error) {
        logger_1.logger.error(`Error in notificationController: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.notificationController = notificationController;
const updateChannelController = async (req, res) => {
    try {
        const validationResult = await (0, validation_1.validateChannel)(req);
        if (!validationResult.success) {
            return res.status(400).json(validationResult);
        }
        // Optional 'platform' flag to choose which platform to send notification to 
        // If platform is null the default method is 'all()'
        const { newChannel, platform } = req.body;
        (0, notificationService_1.updateChannel)(newChannel, platform);
        res.status(204).end();
    }
    catch (error) {
        logger_1.logger.error(`Error in notificationController: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.updateChannelController = updateChannelController;

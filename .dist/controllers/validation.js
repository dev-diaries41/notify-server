"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChannel = exports.validateNotifications = void 0;
const express_validator_1 = require("express-validator");
const validateNotifications = async (req) => {
    try {
        await (0, express_validator_1.check)('message').notEmpty().withMessage('Message is required').run(req);
        // Check for validation errors
        const validationCheck = (0, express_validator_1.validationResult)(req);
        if (!validationCheck.isEmpty()) {
            return { success: false, error: validationCheck.array() };
        }
        return { success: true, message: 'Validation successful' };
    }
    catch (error) {
        console.error(`Error in validateNotifications: ${error.message}`);
        return { success: false, error: error.message };
    }
};
exports.validateNotifications = validateNotifications;
const validateChannel = async (req) => {
    try {
        await (0, express_validator_1.check)('newChannel').notEmpty().withMessage('New channel is required').run(req);
        await (0, express_validator_1.check)('platform').notEmpty().withMessage('Platform is required and must be either telegram or discord').run(req);
        // Check for validation errors
        const validationCheck = (0, express_validator_1.validationResult)(req);
        if (!validationCheck.isEmpty()) {
            return { success: false, error: validationCheck.array() };
        }
        return { success: true, message: 'Validation successful' };
    }
    catch (error) {
        console.error(`Error in validateNotifications: ${error.message}`);
        return { success: false, error: error.message };
    }
};
exports.validateChannel = validateChannel;

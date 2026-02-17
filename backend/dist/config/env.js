"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    PORT: process.env.PORT || '5000',
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'change_me',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};

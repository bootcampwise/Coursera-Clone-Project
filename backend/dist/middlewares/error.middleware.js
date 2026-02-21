"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
};
exports.errorMiddleware = errorMiddleware;
exports.default = exports.errorMiddleware;

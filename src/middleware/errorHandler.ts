import { NextFunction, Request, Response } from "express";
import { Api401Error, Api403Error, BaseError, BusinessLogicError, TypeError } from "../core/error.response";

export const logError = (err: Error) => {
    console.error(err)
}

export const logErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logError(err);
    next(err);
}

export const returnError = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    let error: any;
    if (err instanceof TypeError) {
        error = new BaseError(err.message, err.status, err.errors, err.isOperational);
    } else {
        console.log(err.message);
        error = {...(err)};
        error.message = err.message;
        // mapping error
        if (err.name === 'CastError') error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err)
        if (err.name === 'ValidationError') error = handleValidationErrorDB(err)
        if (err.name === 'JsonWebTokenError') error = handlerJWTError(err)
        if (err.name === 'TokenExpiredError') error = handlerJWTExpiredError(err)
    }

    return res.status(statusCode).json({
        status: statusCode,
        message: error.message || 'Internal server error',
        errors: error.errors
    })
}

export const isOperationalError = (error: any) => {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

export const is404Handler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Api401Error('Resource not found')
    next(error)
}

const handleCastErrorDB = (err: TypeError) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new BusinessLogicError(message)
}

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new BusinessLogicError(message)
}

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el:any) => el.message);
    console.log(errors);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new BusinessLogicError(message)
}

const handlerJWTError = (err: any) => {
    console.error(err)
    const message = `Invalid token. Please login again!`;
    return new Api401Error(message)
}

const handlerJWTExpiredError = (err: any) => {
    console.error(err)
    const message = `Your token has expired! Please log in again.`;
    return new Api403Error(message)
}


'use strict';

import { httpStatusCode } from "./httpStatusCode";


export class BaseError extends Error {
    status: number;
    errors: any; // You can change the type to match your needs
    isOperational: boolean;

    constructor(message: string, status: any, errors: any, isOperational: boolean) {
        super(message) 
        Object.setPrototypeOf(this, new.target.prototype)
        this.status = status
        this.errors = errors
        this.isOperational = isOperational
        Error.captureStackTrace(this, this.constructor)
    }
}

export class Api409Error extends BaseError {
    constructor(message = httpStatusCode.ReasonPhrases.CONFLICT, errors = [], status = httpStatusCode.StatusCodes.CONFLICT, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

export class Api403Error extends BaseError {
    constructor(message = httpStatusCode.ReasonPhrases.FORBIDDEN, errors = [], status = httpStatusCode.StatusCodes.FORBIDDEN, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

export class Api401Error extends BaseError {
    constructor(message = httpStatusCode.ReasonPhrases.UNAUTHORIZED, errors = [], status = httpStatusCode.StatusCodes.UNAUTHORIZED, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

export class BusinessLogicError extends BaseError {
    constructor(message = httpStatusCode.ReasonPhrases.INTERNAL_SERVER_ERROR, errors = [], status = httpStatusCode.StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

export class Api404Error extends BaseError {
    constructor(message = httpStatusCode.ReasonPhrases.NOT_FOUND, errors = [], status = httpStatusCode.StatusCodes.NOT_FOUND, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}
 
export class TypeError extends BaseError {
    path: string;
    value: any; 
    code: number;
    name: string;
    constructor(message: string, status: any, errors: any, isOperational: boolean, path: string, value: any, code: number, name: string) {
        super(message, status, errors, isOperational);
        this.path = path
        this.code = code
        this.name = name
    }
    
}
import { Response } from "express";
import { httpStatusCode } from "./httpStatusCode";

export class SuccessResponse {
    message: string;
    status: number; // You can change the type to match your needs
    data: any;
    options: any;

    constructor({ message, status = httpStatusCode.StatusCodes.OK, data = {}, options = {} }: { message: string, status?: number, data?: any, options?: any }) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.options = options;
    }

    send(res: Response, headers = {}) {
        return res.status(this.status)
            .json(this)
    }
}

export class Ok extends SuccessResponse {
    constructor({message, data = {}, options = {}}: { message: string, data?: any, options?: any }) {
        super({message, data, options})
    }
}


export class Create extends SuccessResponse {
    constructor({message, data = {}, options = {}}: { message: string, data?: any, options?: any}) {
        super({message, status: httpStatusCode.StatusCodes.CREATED, data, options})
    }
}

export const CREATED = (res: Response, message: string, data: any, options = {}) => {
    new Create({
        message,
        data,
        options
    }).send(res)
}

export const OK = (res: Response, message: string, data: any, options = {}) => {
    new Ok({
        message,
        data,
        options
    }).send(res)
}


module.exports = {
    OK,
    CREATED
}
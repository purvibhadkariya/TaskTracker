import { Response } from "express";

export default function resMiddlewareCommon(res: Response, success: boolean, message: string, data?: any, code = 1000) {
    return res.send({
        data: data,
        success: success,
        message: message,
        code: code,
    });
}
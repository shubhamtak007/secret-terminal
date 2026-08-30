import { z, ZodType } from "zod";
import { NextFunction, Request, Response } from "express";
import statusCode from "../constants/http-status-code.js";

export default function schemaVerification(schema: ZodType) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            schema.parse(request.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessageList = JSON.parse(error.message);

                return response.status(statusCode.badRequest).json({
                    message: `${errorMessageList[0].path}: ${errorMessageList[0].message.split(':')[1]}`
                })
            } else {
                return response.status(statusCode.badRequest).json({
                    message: 'Invalid Credentials!!'
                })
            }
        }
    };
}
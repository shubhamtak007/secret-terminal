import { Request, Response } from 'express';
import SearchService from '../search/search.service.js';
import statusCode from '../../constants/http-status-code.js';

const getSearchData = async (request: Request, response: Response) => {
    try {
        const result = await SearchService.search(request.query);
        return response.status(statusCode.ok).json({
            data: result
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(statusCode.internalServerError).json({
                message: error.message
            })
        }

        return response.status(statusCode.internalServerError).json({
            message: "An unknown error occurred"
        });
    }
}

export { getSearchData }
import { Request, Response } from 'express';
import { createErrorResponse } from '../../services/handle-error.service.js';
import SearchService from '../search/search.service.js';
import statusCode from '../../constants/http-status-code.js';

const getSearchData = async (request: Request, response: Response) => {
    try {
        const result = await SearchService.search(request.query);
        return response.status(statusCode.ok).json({
            data: result
        })
    } catch (error) {
        createErrorResponse(error, response);
    }
}

export { getSearchData }
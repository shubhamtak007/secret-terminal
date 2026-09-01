import { Request, Response } from 'express';
import SearchService from '../search/search.service.js';

const getSearchData = async (request: Request, response: Response) => {
    try {
        const result = await SearchService.search(request.query);
        return response.status(200).json({
            data: result
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                message: error.message
            })
        }
    }
}

export { getSearchData }
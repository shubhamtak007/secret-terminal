import { Request, Response } from 'express';
import NewsService from '../news/news.service.js';

const retrieveLatestNews = async (request: Request, response: Response) => {
    try {
        const results = await NewsService.retrieveLatestNews();

        return response.status(200).json({
            data: results?.articles,
            nextPage: results?.nextPage
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                message: error.message
            })
        }
    }
}

export { retrieveLatestNews }
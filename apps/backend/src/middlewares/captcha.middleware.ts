import { verify } from 'hcaptcha';
import { Request, Response, NextFunction } from 'express';

export default async function captchaVerification(request: Request, response: Response, next: NextFunction) {
    try {
        const captchaToken = request.body.captchaToken ? request.body.captchaToken : request.query.captchaToken;

        if (!captchaToken || !process.env.CAPTCHA_SECRET_KEY) {
            return response.status(401).json({
                message: 'Unauthorized'
            })
        }

        const result = await verify(process.env.CAPTCHA_SECRET_KEY, captchaToken);

        if (result.success === false) {
            return response.status(401).json({
                message: result['error-codes'] ? result['error-codes'][0] : 'Failed!!'
            })
        }

        next();
    } catch (error) {
        return response.status(401).json({
            message: 'Unauthorized'
        })
    }
}
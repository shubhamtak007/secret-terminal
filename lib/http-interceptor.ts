import { toast } from 'sonner';
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { secretTerminalEndpoints } from './endpoints';

export const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => {
            if ([200, 201].includes(response.status) && response.data.message &&
                response.config.method && ['post', 'put', 'patch', 'delete'].includes(response.config.method)
                && (response.config.url !== secretTerminalEndpoints.auth.refreshToken)
            ) {
                toast.success(`${response.data.message}`, { className: 'success-toast' });
            }

            return response;

        }, async (error: unknown) => {
            if (error instanceof Error) {
                throw new Error(error.message);

            } else if (error instanceof AxiosError) {
                if (error.response?.data && error.response.data.message) {
                    if (!['Unauthorized'].includes(error.response.data.message)) {
                        toast.error(error.response.data.message, { className: 'error-toast' });

                    } else {
                        throw new Error(error.response.data.message);
                    }
                } else {
                    throw new Error(error.message);
                }
            }

            return Promise.reject(error);
        }
    )
}




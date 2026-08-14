import { toast } from 'sonner';
import { AxiosInstance, isAxiosError } from 'axios';
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
            if (!isAxiosError(error)) throw new Error(JSON.stringify(error));

            if (error.response?.data && error.response.data.message) {
                const message = error.response.data.message.trim().toLowerCase();
                const isAuthError = message.includes('unauthorized') || message.includes('invalid or expired token') ||
                    message.includes('expired');

                if (!isAuthError) {
                    toast.error(error.response.data.message, { className: 'error-toast' });

                } else {
                    throw new Error(error.response.data.message);
                }
            } else {
                throw new Error(error.message);
            }

            return Promise.reject(error);
        }
    )
}




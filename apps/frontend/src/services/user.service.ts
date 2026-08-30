import { secretTerminalClientV2 } from '@/src/lib/api-client';
import { secretTerminalEndpoints } from '@/src/lib/endpoints';

async function retrieveProfile() {
    try {
        const response = await secretTerminalClientV2.get(secretTerminalEndpoints.users.me);
        return response;
    } catch (error) {
        throw error;
    }
};

export { retrieveProfile };
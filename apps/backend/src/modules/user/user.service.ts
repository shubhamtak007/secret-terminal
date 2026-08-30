import { secretTerminalDb } from '../../config/db.js';

async function retrieveUserDetails(userId: string) {
    if (!userId) {
        throw new Error('User id is missing!!.')
    }

    const foundUser = await secretTerminalDb.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true
        },
    });

    if (!foundUser || !foundUser.id) {
        throw new Error("User not found");
    }

    return foundUser;
}

const UserService = { retrieveUserDetails };

export default UserService;
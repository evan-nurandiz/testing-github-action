import { server } from "../../../../../server"

export const createToken = (payload: any) => {
    const token = server.jwt.sign(payload, {
        expiresIn: '1d'
    });

    const refreshToken = server.jwt.sign(payload, {
        expiresIn: '30d'
    });

    return {
        token: token,
        refreshToken: refreshToken
    }
}

module.exports = {
    createToken
}
import { FastifyRequest } from "fastify";
import Promises from 'bluebird';

export const Liveness = async(request:FastifyRequest<{
    Body: {
        email: string,
        password: string
    }
}>, reply: any) => {
    return reply.success({
        status: "OK"
    }, "OK")
}

module.exports = {
    Liveness
}
import { FastifyRequest } from "fastify";

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

export const Health = async(_: FastifyRequest, reply: any) => {
    return reply.success({ status: 'healthy', timestamp: new Date().toISOString() }, "OK")
}

module.exports = {
    Liveness,
    Health
}
import { FastifyRequest } from "fastify";

export const Liveness = async(request:FastifyRequest<{
    Body: {
        email: string,
        password: string
    }
}>, reply: any) => {
    return reply.success({
        status: "GOOD"
    }, "OK")
}

module.exports = {
    Liveness
}
import { FastifyRequest } from "fastify";

export const Liveness = async(request:FastifyRequest<{
    Body: {
        email: string,
        password: string
    }
}>, reply: any) => {
    return reply.success({
        status: "GOOD"
    }, "GOOD")
}

module.exports = {
    Liveness
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const Login = async(request:FastifyRequest, reply: FastifyReply) => {
    return reply.send(request.body);
}

module.exports = {
    Login
}
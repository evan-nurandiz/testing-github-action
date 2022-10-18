import Fastify, { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server : FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({logger: true})

function build() {
    server.get('/ping', async (request, reply) => {
        return { pong: 'it worked!' }
    });

    return server;
}

export default build


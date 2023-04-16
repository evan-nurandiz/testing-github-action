import { FastifyReply } from 'fastify';
import { fastify, FastifyInstance, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as Plugin from './api/lib/server-plugin';

const server : FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger: true})

function build() {
  server.decorateReply('success', Plugin.successResponse)
  server.decorateReply('error', Plugin.errorResponse)

  server.decorate("authenticate", async function (request:FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  return server;
}

export default build

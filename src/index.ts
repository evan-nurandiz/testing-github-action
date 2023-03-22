import { fastify, FastifyInstance } from 'fastify'
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
  return server;
}

export default build

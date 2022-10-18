import Fastify, { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as Plugin from './api/lib/server-plugin'

const server : FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger: true})

function build() {
  server.decorateReply('success', Plugin.successResponse)
  server.decorateReply('error', Plugin.errorResponse)
  server.register(require('./api'),{prefix: 'api/v1'})
  return server;
}

export default build

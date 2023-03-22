import { FastifyInstance } from 'fastify';
import { Server } from 'http';
import path from 'path';

const autoload = require('@fastify/autoload')

export const routes = async(server:FastifyInstance<Server>) => {
    await server.register(autoload, {
        dir: path.join(__dirname, 'modules'),
        dirNameRoutePrefix: function rewrite (_: string, folderName: string) {
            if (folderName !== 'handlers' && folderName !== 'validation') {
              return folderName
            }
            return folderName
        }
    })
}

export default routes;

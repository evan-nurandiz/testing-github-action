import Apllication from './src/index';
import fastifyEnv from '@fastify/env';
import * as dotenv from 'dotenv';
import fastifyJWT from '@fastify/jwt';
dotenv.config()

export const server = Apllication();

const schema = {};

const start = async () => {
  const option = {
    confKey: 'config',
    schema,
    dotenv:true,
    data: process.env
  }

  await server.register(require('./src/api'),{prefix: 'api'})
  await server.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
  })
  await server.register(fastifyEnv, option)
  await server.after()
  console.log('start')
}

start().then(async() => {
    let port = 3030
    if (process.env.PORT) port = parseInt(process.env.PORT)

    try {
      await server.ready()
      await server.listen({port: port, host: '0.0.0.0'})
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
})

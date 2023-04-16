import Apllication from './src/index';
import fastifyEnv from '@fastify/env';
import * as dotenv from 'dotenv';
import fastifyJWT from '@fastify/jwt';
dotenv.config()

export const fastify = Apllication();

const schema = {};

const start = async () => {
  const option = {
    confKey: 'config',
    schema,
    dotenv:true,
    data: process.env
  }

  await fastify.register(require('./src/api'),{prefix: 'api'})
  await fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET
  })
  await fastify.register(fastifyEnv, option)
  await fastify.after()
}

start().then(async() => {
    let port = 3030
    if (process.env.PORT) port = parseInt(process.env.PORT)

    try {
      await fastify.ready()
      await fastify.listen({port: port})
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
})

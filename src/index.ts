import Apllication from '../server';
import fastifyEnv from '@fastify/env';
import * as dotenv from 'dotenv';
dotenv.config()

const fastify = Apllication();

const schema = {};

const start = async () => {
  const option = {
    confKey: 'config',
    schema,
    dotenv:true,
    data: process.env
  }

  fastify.register(fastifyEnv, option)
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

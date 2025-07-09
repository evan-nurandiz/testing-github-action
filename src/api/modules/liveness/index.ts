import { Health, Liveness } from "./handlers/liveness.handler";

async function LivenessRoute (server:any, next: any) {
    server.get('/healthcheck', {
        schema: {},
        handler: Liveness
    }),
    server.get('/health', {
        schema: {},
        handler: Health
    })
}

module.exports = LivenessRoute
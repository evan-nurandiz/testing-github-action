import { Liveness } from "./handlers/liveness.handler";

async function LivenessRoute (server:any, next: any) {
    server.get('/healthcheck', {
        schema: {},
        handler: Liveness
    })
}

module.exports = LivenessRoute
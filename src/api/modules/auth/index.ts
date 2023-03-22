import { Login } from "./handlers/auth.handlers";
import { LoginBody } from "./validation";

async function AuthRoutes (server:any, next: any) {
    server.post('/login', {
        schema: {
            body: LoginBody
        },
        handler: Login
    })
}

module.exports = AuthRoutes
import { Login, Register } from "./handlers/auth.handlers";
import { LoginBody, RegisterBody } from "./validation";

async function AuthRoutes (server:any, next: any) {
    server.post('/login', {
        schema: {
            body: LoginBody
        },
        handler: Login
    }),
    server.post('/register',{
        schema: {
            body: RegisterBody
        },
        handler: Register
    })
}

module.exports = AuthRoutes
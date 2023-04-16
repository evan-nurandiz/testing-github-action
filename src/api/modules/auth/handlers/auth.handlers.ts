import { FastifyRequest } from "fastify";
import {db} from '../../../../config/db.connection';
import Promises, { is } from 'bluebird';
import { createToken } from "../helpers/jwt.helpers";
const bcrypt    = Promises.Promise.promisifyAll(require('bcrypt'));

export const Login = async(request:FastifyRequest<{
    Body: {
        email: string,
        password: string
    }
}>, reply: any) => {
    const {email, password} = request.body;

    try {
        const user = await db.oneOrNone(`
            select u.user_id, u.email, u.password 
            from users u
            where u.email = $1
        `, [email]);

        if (!user) {
            return reply.error(
                404,
                "users not found"
            )
        }

        const isValid = await bcrypt.compareAsync(password, user.password);

        if (!isValid) {
            return reply.error(
                404,
                "password wrong"
            )
        }

        const token = createToken(user)

        return reply.success({
            email: email,
            user_id: user.user_id,
            name: user.name,
            token: token.token,
            refresh_token: token.refreshToken
        }, "success login")
    } catch (err) {
        return reply.error(400, err);
    }
}

export const Register = async(request:FastifyRequest<{
    Body: {
        email:string,
        name: string,
        password:string,
        confirm_password:string
    }
}>, reply: any) => {
    const {email, name, password, confirm_password} = request.body;

    if (password !== confirm_password) {
        return reply.error(
            400,
            "password not match"
        )
    }

    try {
        const salt = await bcrypt.genSaltAsync(12);
        const hash = await bcrypt.hashAsync(password, salt);
        await db.tx(async (trx: any) => {
            const user = await trx.one(`
                INSERT INTO users (email, name, password, created_on)
                VALUES
                ($1, $2, $3, $4) RETURNING *
            `, [email, name, hash, new Date()])
        })

        return reply.success({
            email: email,
            name: name
        }, "success create user") 
    } catch (err: any) {
        if (err.constraint === 'users_email_key') {
            return reply.error(400, 'email already exist');
        }

        return reply.error(400, 'email already exist');
    }
}

module.exports = {
    Login,
    Register
}
export const LoginBody = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 50 },
        password: {type: 'string', maxLength: 100}
    },
    required: ['email']
}

export const RegisterBody = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 50 },
        name: {type: 'string', maxLength: 50},
        password: {type: 'string', maxLength: 100},
        confirm_password: {type: 'string', maxLength: 100}
    },
    required: ['email', 'name', 'password', 'confirm_password']
}

module.exports = {
    LoginBody,
    RegisterBody
}
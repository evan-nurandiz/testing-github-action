export const LoginBody = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 50 },
        password: {type: 'string', maxLength: 100}
    },
    required: ['email']
}

module.exports = {
    LoginBody
}
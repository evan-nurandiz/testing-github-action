export const successResponse = (data:any, message: string) => {
    return {
        "status": 200,
        "message": message,
        "data": data
    }
}

export const errorResponse = (message: string) => {
    return {
        "status": 400,
        "message": message,
    }
}

module.exports = {
    successResponse,
    errorResponse
}
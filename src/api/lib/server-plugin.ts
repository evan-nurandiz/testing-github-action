export const successResponse = (data:any, message: string) => {
    return {
        "status": 200,
        "message": message,
        "data": data
    }
}

export const errorResponse = (status: number,message: string) => {
    return {
        "status": status,
        "message": message,
    }
}

module.exports = {
    successResponse,
    errorResponse
}
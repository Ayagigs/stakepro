import HttpException from "../exceptions/HttpException"
const validatorMiddleware = (schema, values = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[values])
        if (error) throw new HttpException(400, "fields are required")
        next()
    }
}



export default validatorMiddleware
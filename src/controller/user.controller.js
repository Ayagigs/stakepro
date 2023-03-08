import HttpException from "../exceptions/HttpException"

const createAccount = async (req, res, next) => {
    try {
            throw new HttpException(400,"Email address taken")
        // return res.status(200).send("create a stakepro account")
    } catch (err) {
        next(err)
    }
}

export { createAccount }
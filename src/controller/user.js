import HttpException from "../exceptions/HttpException"

const createAccount = async (req, res, next) => {
    try {
        console.log(req.body)
        return res.status(200).send("create a stakepro account")
    } catch (err) {
        next(err)
    }
}

export { createAccount }
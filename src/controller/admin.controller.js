import HttpException from "../exceptions/HttpException"

export const registerEmail = async (req, res) => {
    try {
        
            throw new HttpException(400,"Email address taken")
        // return res.status(200).send("create a stakepro account")
    } catch (err) {
        next(err)
    }
}
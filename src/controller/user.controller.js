const createAccount = async (req, res, next) => {
    try {
        return res.status(200).send("create a stakepro account")
    } catch (err) {
        next(err)
    }
}

export { createAccount }


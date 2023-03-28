export const hasSuperadminAccess = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    if(!token) return res.json({
        status: "error",
        message: "It seems there was no token attached to the header!"
    })

    const decodedUser = verifyToken(token);
    req.role = decodedUser.role

    if (!decodedUser || decodedUser.role !== 'SUPERADMIN') {
        return res.json({
            status: "error",
            message: "you do not have access to this endpoint."
        })
        
    }
        next();
}
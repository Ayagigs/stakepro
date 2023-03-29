import jwt from "jsonwebtoken"

export const verifyToken = token => {
    return jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) return false
        return decoded 
    })
}

export const extractEmailAndRoleFromToken = (token, email, role) => {
    const extractedSubject = verifyToken(token);
    return extractedSubject.email == email && extractedSubject.role == role
}

export const extractRoleFromToken = (token, role) => {
    const extractedSubject = verifyToken(token);
    return extractedSubject.role == role
}
import jwt from "jsonwebtoken"

export const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) return false
        return decoded 
    })
}

export const extractEmailFromToken = (token, email) => {
    const extractedSubject = verifyToken(token);
    console.log("Extracted: ", extractedSubject);
    console.log("Extracted Email: ", extractedSubject.email);
    return extractedSubject.email == email
}

export const extractRoleFromToken = (token, role) => {
    const extractedSubject = verifyToken(token);
    console.log("Extracted: ", extractedSubject);
    console.log("Extracted Role: ", extractedSubject.role);
    return extractedSubject.role == role
}
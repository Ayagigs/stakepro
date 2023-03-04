import jwt from "jsonwebtoken"

export const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) return false
        return decoded 
    })
}

export const extractEmailFromToken = (token, email) => {
    const extractedEmail = verifyToken(token);
    console.log("Extracted: ", extractedEmail);
    console.log("Extracted Email: ", extractedEmail.email);
    return extractedEmail.email == email
}
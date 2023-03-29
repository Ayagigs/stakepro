export const getTokenFromHeader = req => {
    const headers = req.headers;
   const token = headers['authorization']
   if(token) return token.split(" ")[1]
   return false
}

import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

const checkToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const decodedToken = jwt.verify(token, ACCESS_TOKEN)
    
    req.userAuth =decodedToken.id 
    
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
export default checkToken;

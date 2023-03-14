import bcrypt from 'bcrypt'

export const passwordValidator = value => {
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return pattern.test(value)
}

export const passwordHash = async password => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

export const comparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}
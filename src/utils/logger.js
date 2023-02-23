import { createLogger, format, transports } from "winston"

const { printf, combine, colorize, timestamp, errors, } = format
const logFormat = printf(({ level, message, stack, timestamp }) => `${timestamp} [${level}]: ${message || stack}`)

const logger = createLogger({
    format: combine(
        colorize({all:true}),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
    ),
    transports: [new transports.Console() ],
})

export default logger
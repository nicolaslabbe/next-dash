import path from 'path'

export const isDev = (process.env.NODE_ENV === 'development') ? true : false

export const url = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`

export const pathData = path.join(process.cwd(), 'data')
import path from 'path'
import mkdirp from 'mkdirp'

export const url = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`

export const pathData = path.join(process.cwd(), 'data')
export default {
  jwt: {
    secret: process.env.APP_SECRET as string || 'default',
    expiresIn: '1d',
  },
}

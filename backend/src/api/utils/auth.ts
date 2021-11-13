import crypto from 'crypto';

export const generateRandomString = length => crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)

export const computePasswordHash = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex')
  return {
    salt,
    passwordHash,
  }
}

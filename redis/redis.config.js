const Redis = require('ioredis')

const EMAIL_CHANNEL = 'email-channel'

const getRedisService = () => {
  const redis = new Redis()

  redis.on('error', (err) => {
    console.error('Redis error:', err)
    process.exit(1)
  });

  redis.on('connect', () => {
    console.log('Redis connected')
  });

  return redis;
}

module.exports = {
  getRedisService,
  EMAIL_CHANNEL,
};
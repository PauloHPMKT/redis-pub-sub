const { EMAIL_CHANNEL, getRedisService } = require("../redis/redis.config")

const listenerChannel = async ({ redis }) => {
  await redis.subscribe(EMAIL_CHANNEL, (err) => {
    if (err) {
      console.error('Error subscribing to channel:', err.message)
      return;
    }
    console.log('Subscribed to channel:', EMAIL_CHANNEL)
  })

  redis.on('message', (channel, message) => {
    const parsed = JSON.parse(message)
    console.log('Received message: ' + channel, parsed)
  })
}

const redis = getRedisService()
listenerChannel({ redis })
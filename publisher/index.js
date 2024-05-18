const Fastify = require('fastify')
const { getRedisService, EMAIL_CHANNEL } = require('../redis/redis.config')

const sendMessageToChannel = async ({
  message,
  channel,
  redis,
}) => {
  await redis.publish(channel, JSON.stringify(message))
  console.log("🚀 ~ message:", message)
}

// server 
const app = Fastify()
const redis = getRedisService()

app.post('/pub', async (request, reply) => {
  await sendMessageToChannel({
    message: request.body,
    channel: EMAIL_CHANNEL,
    redis,
  })
})

app.listen({ port: 3000 })
  .then(() => console.log('Server listening on port 3000'))
  .catch(console.error)
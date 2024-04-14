const amqp = require('amqplib');

const user = 'user';
const password = 'password';
const host = 'localhost';
const port = 5672;
const uri = `amqp://${user}:${password}@${host}:${port}`;

async function publishMessage(queueName, message) {
  try {
    const connection = await amqp.connect(uri);
    const channel = await connection.createChannel();
    
    // Оголошуємо обмінник (exchange)
    const exchangeName = 'my_exchange';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    // Публікуємо повідомлення до обмінника
    channel.publish(exchangeName, queueName, Buffer.from(message));
    console.log(`Message published to queue "${queueName}": ${message}`);
    
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing message:', error);
    throw error;
  }
}

module.exports = {
  publishMessage
};

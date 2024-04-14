const amqp = require('amqplib');

const user = 'user';
const password = 'password';
const host = 'localhost';
const port = 5672;
const uri = `amqp://${user}:${password}@${host}:${port}`;

async function consumeMessages(queueName, handleMessage) {
  try {
    const connection = await amqp.connect(uri);
    const channel = await connection.createChannel();
    
    // Оголошуємо чергу
    await channel.assertQueue(queueName, { durable: true });
    
    // Встановлюємо обробник повідомлень
    channel.consume(queueName, handleMessage, { noAck: true });
    
    console.log(`Listening for messages on queue "${queueName}"`);
  } catch (error) {
    console.error('Error consuming messages:', error);
    throw error;
  }
}

module.exports = {
  consumeMessages
};

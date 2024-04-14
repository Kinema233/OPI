const amqp = require('amqplib');

const user = 'user';
const password = 'password';
const host = 'localhost';
const port = 5672;
const uri = `amqp://${user}:${password}@${host}:${port}`;

async function connect() {
  try {
    const connection = await amqp.connect(uri);
    console.log('Connected to RabbitMQ');
    return connection;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

module.exports = {
  connect
};


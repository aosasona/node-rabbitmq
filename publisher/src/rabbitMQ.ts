import amqp from "amqplib";

const queue = "events";

export async function rabbitMQ(): Promise<amqp.Channel> {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });
  return channel;
}

export async function publishToQueue(data: any) {
  try {
    const channel = await rabbitMQ();
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    closeConnection(channel);
    return;
  } catch (error) {
    throw error;
  }
}

const closeConnection = (channel: amqp.Channel) => {
  setTimeout(() => {
    channel.close();
    process.exit(0);
  }, 500);
};

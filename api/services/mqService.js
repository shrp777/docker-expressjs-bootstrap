import amqplib from "amqplib";

const BINDINGS = {
  direct: "direct",
  topic: "topic",
  fanout: "fanout"
};

async function publishToMQ(
  amqpURL,
  message = {},
  exchange,
  binding = "direct",
  queue,
  routingKey
) {
  let channel;
  let connection;

  try {
    connection = await amqplib.connect(amqpURL, "heartbeat=60");
    channel = await connection.createChannel();
    //TODO: gérer les conditions d'emploi d'un exchange, d'une routing key ou d'une queue
    await channel.assertExchange(exchange, binding, { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    console.log(`Message published to "${queue}"`);
  } catch (error) {
    console.error(error);
    throw new Error("Can't publish message to RabbitMQ");
  } finally {
    if (channel) await channel.close();
    if (connection) await connection.close();
  }
}

export { publishToMQ, BINDINGS };

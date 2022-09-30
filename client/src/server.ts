import Fastify from "fastify";
import randToken from "rand-token";
import { listenForEvents } from "./rabbitMQ";

const server = Fastify({
  logger: true,
});

const clientID = randToken.uid(4);

server.get("/", async (request, reply) => {
  return {
    success: true,
    message: `Client ${clientID} is running`,
    data: {
      clientID,
    },
  };
});

server.listen(
  {
    port: 21000,
  },
  async (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    await listenForEvents(); // listen for events from RabbitMQ
    server.log.info(`Server listening on ${address}`);
  }
);

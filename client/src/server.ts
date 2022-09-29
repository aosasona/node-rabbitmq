import Fastify from "fastify";
import randToken from "rand-token";

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
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`Server listening on ${address}`);
  }
);

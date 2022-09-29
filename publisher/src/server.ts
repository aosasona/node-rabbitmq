import Fastify from "fastify";
import { handleError } from "./handlerUtil";
import { HTTPException } from "./HTTPException";
import { publishToQueue } from "./rabbitMQ";

interface EventBody {
  event: string;
  data: any;
}

const server = Fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { message: "Publisher is running", success: true };
});

server.post("/publish", async (request, reply) => {
  try {
    const { event, data } = request.body as EventBody;

    if (!event) throw new HTTPException(400, "Event is required");

    if (!data) throw new HTTPException(400, "Data is required");

    const dataToPublish = JSON.stringify({ data, event });

    await publishToQueue(dataToPublish);

    return {
      success: true,
      message: `Event ${event} published!`,
      data,
    };
  } catch (error: any) {
    const err = handleError(error);
    return reply.status(err.code).send(err);
  }
});

server.listen(
  {
    port: 8080,
  },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`Server listening on ${address}`);
  }
);

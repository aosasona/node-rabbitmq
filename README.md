# Node-RabbitMQ

## Usage

Too stressed to be writing this but, I already included a version of RabbitMQ that has the management interface and prometheus and you can just run it with `docker-compose up -d` to save you the trouble of installing it or running `docker run ...`

## Run

Run the following in the repo's root folder

```bash
npm start
```

## Endpoints

- `Publisher` - http://localhost:20000/publish
- `RabbitMQ MI` - http://localhost:15672
- `Prometheus` - http://localhost:15692

You'll find the logged events the client's `dist/logs` folder.

## Sending events

You can send events to the publisher using the `POST` method on the `/publish` endpoint.

![insomnia - publisher](./images/insomnia.png)

## Receiving events

The client is setup to receive events from the publisher and log them to files in text format.

![logs - client/consumer](./images//log.png)

### Disappointed?

Well, I am too but this is just to tinker with [RabbitMQ](https://www.rabbitmq.com/).

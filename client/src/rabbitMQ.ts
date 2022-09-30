import amqp from "amqplib";
import fs from "fs";
import path from "path";

const queue = "events";

export async function rabbitMQ(): Promise<amqp.Channel> {
  const connection = await amqp.connect(
    "amqp://localhost:5672",
    "heartbeat=60"
  );
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });
  return channel;
}

export async function listenForEvents(): Promise<void> {
  try {
    const channel = await rabbitMQ();
    await channel.consume("events", (msg) => {
      if (msg == null) return;
      channel.ack(msg);
      const rawString = msg.content.toString();
      logToFile(rawString);
    });
    return;
  } catch (error) {
    throw error;
  }
}

const logToFile = (data: string) => {
  const today = getCurrentDate();
  const folder = checkFolderExistsOrCreate("logs");
  const logPath = path.join(folder, `${today}.event.log`);
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - ${data}`;
  fs.appendFile(logPath, `${log}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const checkFolderExistsOrCreate = (folderName: string) => {
  const folder = path.join(__dirname, folderName);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  return folder;
};

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

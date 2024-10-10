const { Calculator, Point } = require("./calculator");

const { acknowledgeMessage, getMessages } = require("./queue");

const consumerCalculator = new Calculator();

async function pollQueue() {
  const messages = await getMessages();

  for (const message of messages) {
    console.log("Received message:", message);
  }

  pollQueue();
}

console.log("Consumer started. Waiting for messages...");
pollQueue();

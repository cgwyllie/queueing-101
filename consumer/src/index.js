const { Calculator } = require("./calculator");

const { acknowledgeMessage, getMessages } = require("./queue");

const consumerCalculator = new Calculator();

async function pollQueue() {
    const messages = await getMessages();

    for (const message of messages) {
        console.log("Received message:", message);

        // Parse the message body
        // Do some calculations
        // Output some results to console?
    }

    pollQueue();
}

console.log("Consumer started. Waiting for messages... ctrl + c to exit");
pollQueue();

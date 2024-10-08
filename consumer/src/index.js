const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    endpoint: "http://sqs:9324",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const queueUrl = process.env.SQS_QUEUE_URL;

async function acknowledgeMessage(message) {
    const deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
    };

    await sqsClient.send(new DeleteMessageCommand(deleteParams));
}

async function getMessages() {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
    };

    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params));
        if (data.Messages) {
            return data.Messages;
        }
        return [];
    } catch (err) {
        console.error("Error receiving message:", err);
        return [];
    }
}

async function pollQueue() {

    const messages = await getMessages();

    for (const message of messages) {
        console.log("Received message:", message.Body);
    }

    // Continue polling
    pollQueue();
}

console.log("Consumer started. Waiting for messages...");
pollQueue();
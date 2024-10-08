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

async function processMessage(message) {
    console.log("Received message:", message.Body);

    // Process the message here

    // Delete the message from the queue
    const deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
    };

    try {
        await sqsClient.send(new DeleteMessageCommand(deleteParams));
        console.log("Message deleted successfully");
    } catch (err) {
        console.error("Error deleting message:", err);
    }
}

async function pollQueue() {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
    };

    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params));
        if (data.Messages) {
            for (const message of data.Messages) {
                await processMessage(message);
            }
        }
    } catch (err) {
        console.error("Error receiving message:", err);
    }

    // Continue polling
    pollQueue();
}

console.log("Consumer started. Waiting for messages...");
pollQueue();
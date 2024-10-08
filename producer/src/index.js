const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    endpoint: "http://sqs:9324",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const queueUrl = process.env.SQS_QUEUE_URL;

async function sendMessage(message) {
    const params = {
        QueueUrl: queueUrl,
        MessageBody: message,
    };

    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Message sent successfully:", data.MessageId);
    } catch (err) {
        console.error("Error sending message:", err);
    }
}

// Send a message every 5 seconds
setInterval(() => {
    const message = `Hello from producer! Timestamp: ${new Date().toISOString()}`;
    sendMessage(message);
}, 5000);

console.log("Producer started. Sending messages...");
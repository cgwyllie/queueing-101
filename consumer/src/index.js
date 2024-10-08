const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs")
const { Calculator, Point } = require('./calculator')

const sqsClient = new SQSClient({
    region: "us-east-1",
    endpoint: "http://localhost:9324",
    credentials: {
        accessKeyId: "dummy",
        secretAccessKey: "dummy",
    },
})

const consumerCalculator = new Calculator()

const queue = {
    url: "http://localhost:9324/queue/workshop-queue"
}

async function acknowledgeMessage(message) {
    const deleteParams = {
        QueueUrl: queue.url,
        ReceiptHandle: message.ReceiptHandle,
    }

    await sqsClient.send(new DeleteMessageCommand(deleteParams))
}

async function getMessages() {
    const params = {
        QueueUrl: queue.url,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10,
    }

    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params))
        if (data.Messages) {
            return data.Messages
        }
        return []
    } catch (err) {
        console.error("Error receiving message:", err)
        return []
    }
}

async function pollQueue() {
    const messages = await getMessages()

    if (messages.length === 0) {
        console.log("Current calculator value:", consumerCalculator.calculate)
    }

    for (const message of messages) {

        console.log("Received message:", new_msg)
    }

    pollQueue()
}

console.log("Consumer started. Waiting for messages...")
pollQueue()
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs")
const fs = require('fs').promises

const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    endpoint: "http://sqs:9324",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

const queueUrl = process.env.SQS_QUEUE_URL
const inputFile = process.env.INPUT_FILE || '/app/data/input.json'

async function sendMessage(messageData, messageId) {
    const params = {
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(messageData),
        MessageAttributes: {
            "MessageId": {
                DataType: "String",
                StringValue: messageId
            }
        }
    }

    try {
        const data = await sqsClient.send(new SendMessageCommand(params))
        console.log(`Message sent successfully: ${messageId}, SQS MessageId: ${data.MessageId}`)
    } catch (err) {
        console.error(`Error sending message ${messageId}:`, err)
    }
}

async function processInputFile() {
    try {
        const data = await fs.readFile(inputFile, 'utf8')
        const messages = JSON.parse(data)

        if (!Array.isArray(messages)) {
            throw new Error("Input file does not contain a JSON array")
        }

        for (const message of messages) {
            if (!message.data || !message.msg_id) {
                console.warn("Skipping invalid message:", message)
                continue
            }
            await sendMessage(message.data, message.msg_id)
        }

        console.log("Finished processing all messages")
    } catch (err) {
        console.error("Error processing input file:", err)
    }
}

console.log("Producer started. Reading from file and sending messages...")
processInputFile().catch(console.error)
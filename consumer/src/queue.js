const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:9324",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

const queue = {
  get_url: "http://localhost:9324/queue/workshop-queue",
  send_url: "http://localhost:9324/queue/workshop-result-queue",
  dlq: "http://localhost:9324/queue/workshop-dlq"
};

async function acknowledgeMessage(message) {
  const deleteParams = {
    QueueUrl: queue.get_url,
    ReceiptHandle: message.ReceiptHandle,
  };

  await sqsClient.send(new DeleteMessageCommand(deleteParams));
}

async function getMessages() {
  const params = {
    QueueUrl: queue.get_url,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
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

async function sendMessage(messageData, messageId) {
  await sendMessageToQueue(messageData, messageId, queue.send_url)
}

async function sendMessageToDlq(messageData, messageId) {
  await sendMessageToQueue(messageData, messageId, queue.dlq)
}

async function sendMessageToQueue(messageData, messageId, queue) {
  const params = {
    QueueUrl: queue,
    MessageBody: JSON.stringify(messageData),
    MessageAttributes: {
      MessageId: {
        DataType: "String",
        StringValue: messageId,
      },
    },
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log(
      `Message sent successfully: ${messageId}, SQS MessageId: ${data.MessageId}, Queue: ${queue}`
    );
  } catch (err) {
    console.error(`Error sending message ${messageId}:`, err);
  }
}

module.exports = { acknowledgeMessage, getMessages, sendMessage, sendMessageToDlq };

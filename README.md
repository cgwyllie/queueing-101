# queueing-101

## Prerequisites

- Docker
- Node.js

## Getting started

### Bring up the queue

Run the following command to brin up the queue, ready to accept messages

```sh
docker compose up sqs
```

### Running through scenarios

#### The acknowledgement scenario

There is a stream of messages that need parsed and acknowledged.
Each message has an operation type. 
It's up to you to use the included awful calculator to get an output.

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/ack.json producer
```

#### The duplicates scenario

Some of the events are bing sent multiple times, due to a bug in upstream. 
It's up to you to make sure that these are only processed once.

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/dupes.json producer
```

#### The new type scenario

A new tenant has started publishing events to the stream.
You need to make sure that you're filtering out these events.

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/unprocessable.json producer
```

#### The audit scenario

Corperate wants to know what our calculations values are, they created a result queue for us to send to.

Getting the events
```sh
docker compose run --env INPUT_FILE=/app/inputs/ack.json producer
docker compose run --env INPUT_FILE=/app/inputs/dupes.json producer
docker compose run --env INPUT_FILE=/app/inputs/unprocessable.json producer
```

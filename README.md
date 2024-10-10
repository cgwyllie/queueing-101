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

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/ack.json producer
```

#### The duplicates scenario

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/dupes.json producer
```

#### The new type scenario

Getting the events

```sh
docker compose run --env INPUT_FILE=/app/inputs/unprocessable.json producer
```

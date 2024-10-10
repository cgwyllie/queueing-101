# queueing-101

## Getting started

### Bring up the queue

Run the following command to brin up the queue, ready to accept messages
```sh 
docker compose up sqs
```

### Running through scenarios

The acknowledgement scenario

```sh
docker compose run --env INPUT_FILE=/app/inputs/ack.json producer
```
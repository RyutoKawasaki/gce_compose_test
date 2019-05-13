'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'd5ea22d2b555e58bdcb0c71c4fb3441d',
    channelAccessToken: 'n4zjJbndnf2qhImFQ/HsPGFuXM+sorTZGIsVNUmp67UBNq4mJKEjbq/KMxehd0dr7xZC5GLlhXInHzXl6UWl3FLQmulGkzEKa53qaZehgs1pLg2yeU3PurFoaMAk4OmXORq8Y2I0aQn0+fUhl6LMLAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
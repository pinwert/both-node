var TelegramBot = require('node-telegram-bot-api');
var TOKEN = '------------------------------------';

var redis = require("redis"),
  client = redis.createClient();

// Setup polling way
var bot = new TelegramBot(TOKEN, {polling: true});

// Any kind of message
bot.on('message', function (msg) {
  client.publish('messages', JSON.stringify(msg));
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'Recibido msg: '+msg.message_id);
});


function aboutCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    "I am a Telegram bot built with Node.js. I can chat, tell jokes, show time, and answer AI questions."
  );
}

module.exports = aboutCommand;
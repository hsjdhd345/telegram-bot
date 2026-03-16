function aboutCommand(bot, msg) {
  bot.sendMessage(msg.chat.id, "This bot was built by Yusuf using Node.js.");
}

module.exports = aboutCommand;
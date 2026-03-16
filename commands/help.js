function helpCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    "Commands:\n/start - start the bot\n/help - show help\n/about - about this bot"
  );
}

module.exports = helpCommand;
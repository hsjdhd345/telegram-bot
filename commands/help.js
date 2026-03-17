function helpCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    "Commands:\n/start - start the bot\n/help - show help\n/about - about this bot\n/time - show server time\n/joke - tell a joke\n/bye - say goodbye\n/ai - ask AI a question"
  );
}

module.exports = helpCommand;
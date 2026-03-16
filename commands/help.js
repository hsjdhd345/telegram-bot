function helpCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    `Here are my commands:

/start - start the bot
/help - show help
/about - about this bot
/time - show current server time
/joke - tell a joke
/bye - say goodbye
/ai <question> - ask AI anything

Example:
/ai explain node.js simply`
  );
}

module.exports = helpCommand;
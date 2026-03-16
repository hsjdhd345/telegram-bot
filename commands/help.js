function helpCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
`Here are the available commands:

/start - start the bot
/help - show help menu
/about - about this bot
/time - current server time
/joke - tell a programming joke
/bye - say goodbye
/ai <question> - ask AI anything

Example:
 /ai explain node.js simply`
  );
}

module.exports = helpCommand;
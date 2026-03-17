function helpCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    `Here are my commands:

/start - start the bot
/help - show help
/about - about this bot
/time - show current server time
/joke - tell a programming joke
/quote - get a motivational quote
/fact - get a random fact
/meme - get a meme
/8ball <question> - ask the magic 8-ball
/roll - roll a dice
/bye - say goodbye
/ai <question> - ask AI anything

Examples:
/ai explain node.js simply
/8ball Will I pass my exam?`
  );
}

module.exports = helpCommand;
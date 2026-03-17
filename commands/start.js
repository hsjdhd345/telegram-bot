function startCommand(bot, msg) {
  const name = msg.from?.first_name || msg.from?.username || "friend";

  bot.sendMessage(
    msg.chat.id,
    `Welcome ${name}! 👋

I am a multi-purpose Telegram bot.

Try these commands:
/help - see all commands
/time - current server time
/joke - tell a joke
/quote - get a quote
/fact - random fact
/meme - random meme
/ai <question> - ask AI something

Example:
/ai What is JavaScript?`,
    {
      reply_markup: {
        keyboard: [
          ["Help", "About"],
          ["Time", "Joke"],
          ["Quote", "Fact"],
          ["Roll", "Meme"]
        ],
        resize_keyboard: true
      }
    }
  );
}

module.exports = startCommand;
function startCommand(bot, msg) {
  const name = msg.from?.first_name || msg.from?.username || "friend";

  bot.sendMessage(
    msg.chat.id,
    `Welcome ${name}! 👋

I am a Telegram bot built with Node.js.

Try these commands:
/help - see all commands
/time - current server time
/joke - tell a joke
/ai <question> - ask AI something

Example:
/ai What is JavaScript?`,
    {
      reply_markup: {
        keyboard: [
          ["Help", "About"],
          ["Time", "Joke"]
        ],
        resize_keyboard: true
      }
    }
  );
}

module.exports = startCommand;
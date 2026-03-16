function startCommand(bot, msg) {
  const name = msg.from?.first_name || msg.from?.username || "friend";

  bot.sendMessage(
    msg.chat.id,
    `Welcome ${name}! 👋

I am a multi-purpose Telegram bot.

Try these commands:
/help - see what I can do
/time - current server time
/joke - random developer joke
/ai <question> - ask the AI something

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
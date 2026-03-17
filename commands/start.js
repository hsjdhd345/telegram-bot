function startCommand(bot, msg) {
  const name = msg.from?.first_name || msg.from?.username || "friend";

  bot.sendMessage(
    msg.chat.id,
    `Welcome ${name}! Choose an option below:`,
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
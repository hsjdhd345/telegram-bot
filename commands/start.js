function startCommand(bot, msg) {
  bot.sendMessage(msg.chat.id, "Welcome Yusuf! Choose an option below:", {
    reply_markup: {
      keyboard: [
        ["Help", "About"],
        ["Time", "Joke"]
      ],
      resize_keyboard: true
    }
  });
}

module.exports = startCommand;
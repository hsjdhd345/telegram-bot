function aboutCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    `🤖 Telegram Utility Bot

Built with:
• Node.js
• Telegram Bot API
• Axios
• Railway hosting

Features:
• AI replies
• Jokes
• Time command
• Friendly chat

More commands coming soon 🚀`
  );
}

module.exports = aboutCommand;
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
• AI chat
• Jokes
• Time command
• Chat interaction

More commands coming soon 🚀`
  );
}

module.exports = aboutCommand;
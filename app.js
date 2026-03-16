require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("./database/connect");

const startCommand = require("./commands/start");
const helpCommand = require("./commands/help");
const aboutCommand = require("./commands/about");
const getTime = require("./utils/getTime");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN is missing. Add it to your environment variables.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const startBot = async () => {
  await connectDB();
  console.log("Bot is running...");
};

startBot();

bot.on("polling_error", (error) => {
  console.log("Polling error:", error.message);
});

bot.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help" },
  { command: "about", description: "About this bot" },
  { command: "time", description: "Show current server time" },
  { command: "joke", description: "Tell a Node.js joke" },
  { command: "bye", description: "Say goodbye" }
]);

bot.onText(/\/start/, (msg) => {
  startCommand(bot, msg);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    helpCommand(bot, msg);
  }, 1000);
});

bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    aboutCommand(bot, msg);
  }, 1000);
});

bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `Server time: ${getTime()}`);
  }, 1000);
});

bot.onText(/\/joke/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(
      chatId,
      "Node.js developers do not sleep, they wait for callbacks."
    );
  }, 1500);
});

bot.onText(/\/bye/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, "Goodbye Yusuf! See you next time.");
  }, 1000);
});

bot.on("message", (msg) => {
  const text = (msg.text || "").toLowerCase();
  const chatId = msg.chat.id;

  if (text.startsWith("/")) return;

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    if (text === "help") {
      helpCommand(bot, msg);
    } else if (text === "about") {
      aboutCommand(bot, msg);
    } else if (text === "time") {
      bot.sendMessage(chatId, `Server time: ${getTime()}`);
    } else if (text === "joke") {
      bot.sendMessage(
        chatId,
        "Node.js developers do not sleep, they wait for callbacks."
      );
    } else if (text === "hi") {
      bot.sendMessage(chatId, "Hi Yusuf 👋");
    } else if (text === "how are you") {
      bot.sendMessage(
        chatId,
        "I am just a Node.js bot but I'm doing great!"
      );
    } else if (text === "bye") {
      bot.sendMessage(chatId, "Goodbye Yusuf! See you next time.");
    } else {
      bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
  }, 1000);
});
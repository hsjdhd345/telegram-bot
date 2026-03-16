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
  helpCommand(bot, msg);
});

bot.onText(/\/about/, (msg) => {
  aboutCommand(bot, msg);
});

bot.onText(/\/time/, (msg) => {
  bot.sendMessage(msg.chat.id, `Server time: ${getTime()}`);
});

bot.onText(/\/joke/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Node.js developers do not sleep, they wait for callbacks."
  );
});

bot.onText(/\/bye/, (msg) => {
  bot.sendMessage(msg.chat.id, "Goodbye Yusuf! See you next time.");
});

bot.on("message", (msg) => {
  const text = (msg.text || "").toLowerCase();

  if (text.startsWith("/")) return;

  if (text === "help") {
    helpCommand(bot, msg);
  } else if (text === "about") {
    aboutCommand(bot, msg);
  } else if (text === "time") {
    bot.sendMessage(msg.chat.id, `Server time: ${getTime()}`);
  } else if (text === "joke") {
    bot.sendMessage(
      msg.chat.id,
      "Node.js developers do not sleep, they wait for callbacks."
    );
  } else if (text === "hi") {
    bot.sendMessage(msg.chat.id, "Hi Yusuf 👋");
  } else if (text === "how are you") {
    bot.sendMessage(
      msg.chat.id,
      "I am just a Node.js bot but I'm doing great!"
    );
  } else if (text === "bye") {
    bot.sendMessage(msg.chat.id, "Goodbye Yusuf! See you next time.");
  } else {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});
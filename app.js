const TelegramBot = require("node-telegram-bot-api");

const startCommand = require("./commands/start");
const helpCommand = require("./commands/help");
const aboutCommand = require("./commands/about");
const getTime = require("./utils/getTime");

const token = "8640913582:AAHibWAxEhbHj048zJmtveIomD0sOrfwpfM";
const bot = new TelegramBot(token, { polling: true });

console.log("Bot is running...");

bot.on("polling_error", (error) => {
  console.log("Polling error:", error.message);
});

bot.onText(/\/start/, (msg) => {
  startCommand(bot, msg);
});

bot.onText(/\/help/, (msg) => {
  helpCommand(bot, msg);
});

bot.onText(/\/about/, (msg) => {
  aboutCommand(bot, msg);
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
    bot.sendMessage(msg.chat.id, "I am just a Node.js bot but I'm doing great!");
  } else {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});
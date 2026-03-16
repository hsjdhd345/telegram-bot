require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const startCommand = require("./commands/start");
const helpCommand = require("./commands/help");
const aboutCommand = require("./commands/about");
const getTime = require("./utils/getTime");

const token = process.env.BOT_TOKEN;
const giftedApiKey = process.env.GIFTED_API_KEY || "gifted";

if (!token) {
  console.error("BOT_TOKEN is missing.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log("Bot is running...");

bot.on("polling_error", (error) => {
  console.log("Polling error:", error.message);
});

function getUserName(msg) {
  return msg.from?.first_name || msg.from?.username || "friend";
}

bot.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help" },
  { command: "about", description: "About this bot" },
  { command: "time", description: "Show server time" },
  { command: "joke", description: "Tell a joke" },
  { command: "bye", description: "Say goodbye" },
  { command: "ai", description: "Ask the AI a question" }
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
  }, 1200);
});

bot.onText(/\/bye/, (msg) => {
  const chatId = msg.chat.id;
  const name = getUserName(msg);

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `Goodbye ${name}! See you next time.`);
  }, 1000);
});

bot.onText(/\/ai (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

  try {
    bot.sendChatAction(chatId, "typing");

    const response = await axios.get(
      `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(question)}&owner=Yusuf&botname=NodeBot`
    );

    bot.sendMessage(chatId, response.data.response);

  } catch (error) {
    console.log("AI request failed:", error.message);
    bot.sendMessage(chatId, "AI service is temporarily unavailable.");
  }
});
  

bot}
});.onText(/\/ai$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Use the command like this:\n/ai What is Node.js?"
  );
});

bot.on("message", (msg) => {
  const text = (msg.text || "").toLowerCase();
  const chatId = msg.chat.id;
  const name = getUserName(msg);

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
    } else if (text === "hi" || text === "hello") {
      bot.sendMessage(chatId, `Hi ${name} 👋`);
    } else if (text === "how are you") {
      bot.sendMessage(chatId, `I am doing great, ${name}!`);
    } else if (text === "bye") {
      bot.sendMessage(chatId, `Goodbye ${name}!`);
    } else {
      bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
  }, 1000);
});
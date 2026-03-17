require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const OpenAI = require("openai");
const axios = require("axios");

const startCommand = require("./commands/start");
const helpCommand = require("./commands/help");
const aboutCommand = require("./commands/about");
const getTime = require("./utils/getTime");

const token = process.env.BOT_TOKEN;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!token) {
  console.error("BOT_TOKEN is missing.");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing.");
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

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const facts = [
  "Honey never spoils.",
  "Octopuses have three hearts.",
  "Bananas are berries, but strawberries are not.",
  "A day on Venus is longer than a year on Venus.",
  "Some cats are allergic to humans."
];

const quotes = [
  "Success is the sum of small efforts repeated day in and day out.",
  "Do something today that your future self will thank you for.",
  "Dream big, start small, stay consistent.",
  "Discipline beats motivation when motivation disappears.",
  "The best way to learn is by building."
];

const ballAnswers = [
  "Yes.",
  "No.",
  "Maybe.",
  "Definitely.",
  "Not now.",
  "Ask again later.",
  "Very likely.",
  "I don't think so.",
  "Absolutely.",
  "It is uncertain."
];

bot.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help" },
  { command: "about", description: "About this bot" },
  { command: "time", description: "Show server time" },
  { command: "joke", description: "Tell a joke" },
  { command: "quote", description: "Get a motivational quote" },
  { command: "fact", description: "Get a random fact" },
  { command: "meme", description: "Get a meme image" },
  { command: "8ball", description: "Ask the magic 8-ball" },
  { command: "roll", description: "Roll a dice" },
  { command: "bye", description: "Say goodbye" },
  { command: "ai", description: "Ask AI a question" }
]);

bot.onText(/\/start/, (msg) => {
  startCommand(bot, msg);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    helpCommand(bot, msg);
  }, 700);
});

bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    aboutCommand(bot, msg);
  }, 700);
});

bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `Server time: ${getTime()}`);
  }, 700);
});

bot.onText(/\/joke/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(
      chatId,
      "Node.js developers do not sleep, they wait for callbacks."
    );
  }, 900);
});

bot.onText(/\/quote/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `💡 Quote:\n${randomItem(quotes)}`);
  }, 700);
});

bot.onText(/\/fact/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `📘 Fact:\n${randomItem(facts)}`);
  }, 700);
});

bot.onText(/\/roll/, (msg) => {
  const chatId = msg.chat.id;
  const number = Math.floor(Math.random() * 6) + 1;
  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `🎲 You rolled: ${number}`);
  }, 700);
});

bot.onText(/\/8ball (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];
  const answer = randomItem(ballAnswers);

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `🎱 Question: ${question}\nAnswer: ${answer}`);
  }, 900);
});

bot.onText(/\/8ball$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Use it like this:\n/8ball Will I become a great developer?"
  );
});

bot.onText(/\/meme/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    bot.sendChatAction(chatId, "typing");

    const response = await axios.get("https://meme-api.com/gimme");
    const memeUrl = response.data?.url;
    const caption = response.data?.title || "Here is your meme 😄";

    if (!memeUrl) {
      bot.sendMessage(chatId, "Could not fetch a meme right now.");
      return;
    }

    await bot.sendPhoto(chatId, memeUrl, { caption });
  } catch (error) {
    console.log("Meme error:", error.message);
    bot.sendMessage(chatId, "Could not fetch a meme right now.");
  }
});

bot.onText(/\/bye/, (msg) => {
  const chatId = msg.chat.id;
  const name = getUserName(msg);

  bot.sendChatAction(chatId, "typing");

  setTimeout(() => {
    bot.sendMessage(chatId, `Goodbye ${name}! See you next time.`);
  }, 700);
});

bot.onText(/\/ai (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

  try {
    bot.sendChatAction(chatId, "typing");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly, helpful Telegram bot. Keep answers clear, useful, and not too long unless the user asks for detail."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const reply =
      response.choices?.[0]?.message?.content || "I could not generate a reply.";

    bot.sendMessage(chatId, reply);
  } catch (error) {
    console.log("OpenAI error:", error.message);
    bot.sendMessage(chatId, "AI service is currently unavailable.");
  }
});

bot.onText(/\/ai$/, (msg) => {
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
    } else if (text === "quote") {
      bot.sendMessage(chatId, `💡 Quote:\n${randomItem(quotes)}`);
    } else if (text === "fact") {
      bot.sendMessage(chatId, `📘 Fact:\n${randomItem(facts)}`);
    } else if (text === "roll") {
      const number = Math.floor(Math.random() * 6) + 1;
      bot.sendMessage(chatId, `🎲 You rolled: ${number}`);
    } else if (text === "hi" || text === "hello") {
      bot.sendMessage(chatId, `Hi ${name} 👋`);
    } else if (text === "how are you") {
      bot.sendMessage(chatId, `I am doing great, ${name}!`);
    } else if (text === "bye") {
      bot.sendMessage(chatId, `Goodbye ${name}!`);
    } else {
      bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
  }, 700);
});
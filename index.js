const { LineBot, ConsoleBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config.js').line;
const handler = require('./handler');

const useConsole = process.env.USE_CONSOLE === 'true';

const bot = useConsole
  ? new ConsoleBot({ fallbackMethods: true })
  : new LineBot({
      accessToken: config.accessToken,
      channelSecret: config.channelSecret,
      sendMethod: 'reply',
    });

// 初始的 state
bot.setInitialState({
  開團中: false,
  開團人: '',
  訂單: [],
});

bot.onEvent(handler);

if (useConsole) {
  bot.createRuntime();
} else {
  const server = createServer(bot);
  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`server is running on ${port} port...`);
  });
}

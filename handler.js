const { LineHandler } = require('bottender');

const 開團 = require('./actions/開團');
const 截止 = require('./actions/截止');
const 統計 = require('./actions/統計');
const 取消訂單 = require('./actions/取消訂單');
const 下訂單 = require('./actions/下訂單');

// 沒開團的狀態下，輸入「開團」可以開團
const 未開團handler = new LineHandler().onText('開團', 開團).build();

// 已開團的狀態下除了三種指令都視為下訂單
const 開團中handler = new LineHandler()
  .onText('截止', 截止)
  .onText('統計', 統計)
  .onText('取消', 取消訂單)
  .onText(下訂單)
  .build();

// 按照 state 決定要現在的狀態要用哪個子 handler
module.exports = new LineHandler()
  .on(context => !context.state.開團中, 未開團handler)
  .on(context => context.state.開團中, 開團中handler)
  .build();

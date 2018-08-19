// Handler Builder 中 onText() 如果使用 Regular Expression 會把 match 的結果傳入第二個參數
module.exports = async (context, match) => {
  const { userId, displayName } = context.session.user;

  // 檢查訂單裡面有沒有這個人點過的東西
  if (context.state.訂單.some(obj => obj.userId === userId)) {
    await context.sendText(
      `${displayName} 你已經點過了，可以輸入「取消」再點一次`
    );
  } else {
    // 去掉前後空白
    const order = match[1].trim();

    // 把訂單塞進 state 中
    context.setState({
      ...context.state,
      訂單: context.state.訂單.concat({
        name: displayName,
        userId,
        order,
      }),
    });

    await context.sendText(`我知道 ${displayName} 你點的是 ${order}`);
  }
};

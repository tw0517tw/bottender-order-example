module.exports = async (context, match) => {
  const { userId, displayName } = context.session.user;

  if (context.state.訂單.some(obj => obj.userId === userId)) {
    await context.replyText(
      `${displayName} 你已經點過了，可以輸入「取消」再點一次`
    );
  }

  const order = match[1].trim();

  context.setState({
    ...context.state,
    訂單: context.state.訂單.concat({
      name: displayName,
      order,
    }),
  });

  await context.sendText(`我知道 ${displayName} 你點的是 ${order}`);
};

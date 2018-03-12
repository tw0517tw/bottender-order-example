module.exports = async context => {
  const { userId, displayName } = context.session.user;

  if (context.state.訂單.some(obj => obj.userId === userId)) {
    context.setState({
      ...context.state,
      訂單: context.state.訂單.filter(order => order.userId !== userId),
    });
    await context.replyText(`${displayName} 幫你取消囉!`);
  } else {
    await context.replyText(
      `${displayName} 你沒點過無法取消，輸入「我要ooo」來下訂單`
    );
  }
};

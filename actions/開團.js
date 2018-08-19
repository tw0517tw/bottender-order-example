module.exports = async context => {
  const { displayName } = context.session.user;

  // 設定為開團初始 state
  context.setState({
    開團中: true,
    開團人: context.session.user,
    訂單: [],
  });

  await context.sendText(`${displayName} 開團囉! 大家快來點!`);
};

module.exports = async context => {
  const { displayName } = context.session.user;
  context.setState({
    開團: true,
    開團人: context.session.user,
    訂單: [],
  });

  await context.replyText(`${displayName} 開團囉! 大家快來點!`);
};

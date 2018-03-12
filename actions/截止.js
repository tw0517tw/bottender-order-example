module.exports = async context => {
  const { userId, displayName } = context.session.user;
  if (context.state.開團人.userId === userId) {
    context.resetState();
    await context.replyText('===截止===');
  } else {
    await context.replyText(`${displayName} 不是你開的團，不讓你截止`);
  }
};

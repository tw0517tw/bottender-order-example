module.exports = async context => {
  const sortedOrders = context.state.訂單
    .sort((a, b) => a.order.localeCompare(b.order))
    .reduce((prev, o) => {
      const { name, order } = o;

      // 檢查有沒有人點過一樣的東西
      const match = Object.keys(prev).find(k => order === k);
      if (match) {
        return {
          ...prev,
          [order]: prev[order].concat(name),
        };
      }
      return { ...prev, [order]: [name] };
    }, {});

  const orderNames = Object.keys(sortedOrders);
  const result = orderNames
    .map(
      o =>
        `${o} 有 ${sortedOrders[o].length} 份，是 ${sortedOrders[o].join(
          ', '
        )} 點的`
    )
    .join('\n');
  context.replyText(result);
};

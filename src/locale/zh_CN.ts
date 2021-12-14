const zh_CN = {
  table: {
    pagination: ({
      currentStart,
      currentEnd,
      total,
    }: {
      currentStart: number;
      currentEnd: number;
      total: number;
    }) => `${currentStart} - ${currentEnd}项, 共${total}项`,
  },
};

export default zh_CN;

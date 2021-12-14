const zh_TW = {
  table: {
    pagination: ({
      currentStart,
      currentEnd,
      total,
    }: {
      currentStart: number;
      currentEnd: number;
      total: number;
    }) => `${currentStart} - ${currentEnd}項, 共${total}項`,
  },
};

export default zh_TW;

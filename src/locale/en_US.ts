const en_US = {
  table: {
    pagination: ({
      currentStart,
      currentEnd,
      total,
    }: {
      currentStart: number;
      currentEnd: number;
      total: number;
    }) => `${currentStart} - ${currentEnd}items, ${total} total`,
  },
};

export default en_US;

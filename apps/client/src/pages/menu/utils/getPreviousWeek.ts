const getPreviousWeek = (date: Date) =>
  new Date(date.setDate(date.getDate() - 7));

export default getPreviousWeek;

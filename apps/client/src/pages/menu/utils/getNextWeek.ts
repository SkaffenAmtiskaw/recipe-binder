const getNextWeek = (date: Date) => new Date(date.setDate(date.getDate() + 7));

export default getNextWeek;

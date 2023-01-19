export const getStringDate = (date: Date) => {
  // return date.toISOString().slice(0, 10);
  let year = date.getFullYear();
  let month: string = String(date.getMonth() + 1);
  let day: string = String(date.getDate());
  if (Number(month) < 10) {
    month = `0${month}`;
  }
  if (Number(day) < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

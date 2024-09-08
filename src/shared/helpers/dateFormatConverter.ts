export const dateFormatConverter = (date: Date | string) => {
  return new Date(date).toLocaleDateString('ru-RU');
};
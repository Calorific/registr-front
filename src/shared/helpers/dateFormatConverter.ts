import dayjs from 'dayjs';

export const dateFormatConverter = (date: Date | string) => {
  if (typeof date === 'string') {
    return date;
  }
  return dayjs(date).format('DD.MM.YYYY');
};
import dayjs from 'dayjs';

export const dateFormatConverter = (date?: Date | string) => {
  if (date === '__.__.____') {
    return undefined;
  }

  if (typeof date === 'string' || !date) {
    return date;
  }

  return dayjs(date).format('DD.MM.YYYY');
};
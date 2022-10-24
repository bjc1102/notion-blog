import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const formatDate = (date: string) => {
  return dayjs(date).format('LL');
};

export const formatISO = (date: string) => {
  return date.substring(0, 10);
};

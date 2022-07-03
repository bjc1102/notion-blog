import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const getDate = (date: string) => {
  return dayjs(date).format('LL');
};

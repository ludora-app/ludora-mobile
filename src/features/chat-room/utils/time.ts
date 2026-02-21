import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/fr';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('fr');

export const formatMessageTime = (date?: string | Date) => {
  if (!date) return '';
  const d = dayjs(date);
  const today = dayjs();

  if (d.isToday()) {
    return d.format('HH:mm'); // e.g. 14:30
  }

  if (d.isYesterday() || today.diff(d, 'day') < 7) {
    const dayStr = d.format('ddd');
    const capitalizedDay = dayStr.charAt(0).toUpperCase() + dayStr.slice(1);
    return `${capitalizedDay} ${d.format('HH:mm')}`;
  }

  return d.format('D MMM HH:mm');
};

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.locale('fr');

export function formatDateLabel(dateStr: string) {
  const date = dayjs(dateStr);

  if (date.isToday()) {
    return "Aujourd'hui";
  }
  if (date.isTomorrow()) {
    return 'Demain';
  }
  return date.format('dddd DD/MM');
}

export function formatToHour({ date, format }: { date: string; format?: string }) {
  const time = dayjs(date);
  const minutes = time.minute();

  if (format) {
    return time.format(format);
  }

  if (minutes === 0) {
    return time.format('HH[h]');
  }
  return time.format('HH[h]mm');
}

export function formatDateShort({ date, format = 'ddd DD MMM' }: { date: string; format?: string }) {
  const formatted = dayjs(date).format(format);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

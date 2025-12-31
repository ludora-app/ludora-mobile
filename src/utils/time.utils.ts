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

export function formatToHour({
  date,
  format,
  showMinutesWhenMinutesZero = false,
}: {
  date: string;
  format?: string;
  showMinutesWhenMinutesZero?: boolean;
}) {
  const time = dayjs(date);
  const minutes = time.minute();

  if (format) {
    return time.format(format);
  }

  if (minutes === 0 && !showMinutesWhenMinutesZero) {
    return time.format('HH[h]');
  }
  return time.format('HH[h]mm');
}

export function formatDateShort({ date, format = 'ddd DD MMM' }: { date: string; format?: string }) {
  const formatted = dayjs(date).format(format);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function getDuration({
  endTime,
  measurement = 'minutes',
  startTime,
}: {
  startTime: string;
  endTime: string;
  measurement?: 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
}) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  return end.diff(start, measurement);
}

import dayjs from '@/lib/dayjs';

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

export function formatDate({ date, format = 'DD/MM/YYYY' }: { date: string; format?: string }) {
  return dayjs(date).format(format);
}

export function isAfterNow(date: string) {
  return dayjs().isAfter(dayjs(date));
}

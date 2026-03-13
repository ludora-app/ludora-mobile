import dayjs from '@/lib/dayjs';

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

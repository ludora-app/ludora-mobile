import dayjs from 'dayjs';
import 'dayjs/locale/fr';

/**
 * Format the date to be displayed as dd/mm/yyyy
 * @param date - The date to format
 * @returns "Aujourd'hui" if the date is today
 * @returns "Hier" if the date is yesterday
 * @returns "dd/mm/yyyy" if the date is not today or yesterday
 */
function formatDate(date: string) {
  if (dayjs(date).isSame(dayjs(), 'day')) {
    return "Aujourd'hui";
  }
  if (dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')) {
    return 'Hier';
  }

  return dayjs(date).format('DD/MM/YYYY');
}

/**
 * Format the hour to be displayed as hh:mm
 * @param date - The date to format
 * @returns The formatted hour
 */
function formatHour(date: string) {
  return dayjs(date).format('HH:mm');
}

/**
 * Format the day of the week to be displayed as dddd DD/MM
 * @param date - The date to format
 * @returns The formatted day of the week
 * @returns "Aujourd'hui" if the date is today
 * @returns "Hier" if the date is yesterday
 */
function getDayOfWeek(date: string) {
  if (dayjs(date).isSame(dayjs(), 'day')) {
    return "Aujourd'hui";
  }
  if (dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')) {
    return 'Hier';
  }

  return dayjs(date)
    .locale('fr')
    .format('dddd DD/MM')
    .replace(/^\w/, c => c.toUpperCase());
}

function getEstimatedTime(startDate: string, endDate: string) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const durationInMinutes = end.diff(start, 'minutes');
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours}h${minutes > 0 ? minutes : ''}`;
}

export { formatDate, formatHour, getDayOfWeek, getEstimatedTime };

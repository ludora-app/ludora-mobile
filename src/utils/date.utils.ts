import dayjs from 'dayjs';

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

export { formatDate, formatHour };

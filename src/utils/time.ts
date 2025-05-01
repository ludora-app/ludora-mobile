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

export function formatToHour(dateStr: string) {
  return dayjs(dateStr).format('HH:mm');
}

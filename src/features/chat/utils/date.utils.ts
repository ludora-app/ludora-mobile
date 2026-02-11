import dayjs from 'dayjs';
import 'dayjs/locale/fr';

/**
 * Convertit un timestamp en format adaptatif :
 * - Si c'est aujourd'hui : affiche l'heure (ex: "11:11")
 * - Si c'est dans la semaine dernière : affiche le jour (ex: "Samedi", "Dimanche", "Lundi")
 * - Si c'est plus d'une semaine : affiche la date (ex: "25/01/2026")
 *
 * @param timestamp - Le timestamp à convertir (en millisecondes ou format ISO)
 * @returns Le format adapté selon la date
 */
export function formatChatTimestamp(timestamp: string | number): string {
  const date = dayjs(timestamp);
  const now = dayjs();

  // Si c'est aujourd'hui, retourner l'heure
  if (date.isSame(now, 'day')) {
    return date.format('HH:mm');
  }

  // Calculer la différence en jours
  const daysDiff = now.diff(date, 'day');

  // Si c'est dans la semaine dernière (1 à 7 jours)
  if (daysDiff >= 1 && daysDiff <= 7) {
    return date
      .locale('fr')
      .format('dddd')
      .replace(/^\w/, c => c.toUpperCase());
  }

  // Si c'est plus d'une semaine, retourner la date complète
  return date.format('DD/MM/YYYY');
}

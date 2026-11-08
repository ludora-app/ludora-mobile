import { useTranslate } from '@tolgee/react';

/** Formats a duration in minutes: `30 min`, `2 h`, `2 h 30`. */
export const useDurationLabel = () => {
  const { t } = useTranslate();

  return (duration: number) => {
    if (duration < 60) return t('duration-picker.minutes', { minutes: duration });
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes ? t('duration-picker.hours_minutes', { hours, minutes }) : t('duration-picker.hours', { hours });
  };
};

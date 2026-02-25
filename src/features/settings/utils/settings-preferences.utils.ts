import { SportPreferenceResponseData } from '@/api/generated/model';

import { PreferencesSportData } from '../stores/settings-preferences.store';

const formatSportPref = (sp: Pick<SportPreferenceResponseData, 'gameModes' | 'level' | 'sport'>) => ({
  gameModes: [...(sp.gameModes ?? [])].sort((a, b) => String(a).localeCompare(String(b))),
  level: sp.level,
  sport: sp.sport,
});

export const formatPreferencesForComparison = (sportPrefs: readonly SportPreferenceResponseData[] | undefined) => {
  if (!sportPrefs) return [];

  return sportPrefs
    .map(formatSportPref)
    .sort((a, b) => (a.sport ?? '').localeCompare(b.sport ?? ''));
};

export const checkIsPreferencesDirty = (initialPrefs: ReturnType<typeof formatPreferencesForComparison>, currentPrefs: PreferencesSportData[]) => {
  if (initialPrefs.length === 0 && currentPrefs.length === 0) return false;

  const formattedCurrent = [...currentPrefs]
    .map(sp => ({
      gameModes: [...sp.gameModes].sort((a, b) => (a as string).localeCompare(b as string)),
      level: sp.level,
      sport: sp.sport,
    }))
    .sort((a, b) => (a.sport as string).localeCompare(b.sport as string));

  return JSON.stringify(initialPrefs) !== JSON.stringify(formattedCurrent);
};

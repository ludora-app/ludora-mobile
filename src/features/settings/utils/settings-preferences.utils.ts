import { PreferencesSportData } from '../stores/settings-preferences.store';

/**
 * Formats API data into the store's internal representation for comparison.
 */
export const formatPreferencesForComparison = (sportPrefs: any[], gameModePrefs: any[]) => {
  if (!sportPrefs || !gameModePrefs) return [];

  return sportPrefs
    .map(sp => ({
      gameModes: gameModePrefs
        .filter(gm => gm.sportPreference?.sport === sp.sport)
        .map(gm => gm.gameMode)
        .sort((a, b) => (a as string).localeCompare(b as string)),
      level: sp.level,
      sport: sp.sport,
    }))
    .sort((a, b) => (a.sport as string).localeCompare(b.sport as string));
};

/**
 * Compares current store state with initial API state to detect changes.
 */
export const checkIsPreferencesDirty = (initialPrefs: any[], currentPrefs: PreferencesSportData[]) => {
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

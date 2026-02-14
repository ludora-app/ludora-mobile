import { PreferencesSportData } from '../stores/settings-preferences.store';

/**
 * Formats API data into the store's internal representation for comparison.
 * Since the consolidated sportPreferences already contain gameModes, we just map it.
 */
export const formatPreferencesForComparison = (sportPrefs: any[]) => {
  if (!sportPrefs) return [];

  return sportPrefs
    .map(sp => ({
      gameModes: (sp.gameModes ?? []).sort((a, b) => (a as string).localeCompare(b as string)),
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

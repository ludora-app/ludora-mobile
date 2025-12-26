import { useTolgee } from '@tolgee/react';

export const useLanguages = () => {
  const tolgee = useTolgee(['language']);

  const getLanguage = () => {
    const tolgeeLang = tolgee.getLanguage();
    switch (tolgeeLang) {
      case 'fr-FR':
        return 'fr';
      case 'en':
        return 'en';
      default:
        return 'fr';
    }
  };
  return { getLanguage };
};

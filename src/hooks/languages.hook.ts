import { useTolgee } from '@tolgee/react';

export const useLanguages = () => {
  const tolgee = useTolgee(['language']);

  const getLanguage = () => {
    const tolgeeLang = tolgee.getLanguage();
    return tolgeeLang;
  };
  return { getLanguage };
};

import { useTranslate } from '@tolgee/react';

import { HeaderMascot } from '@/components/ui/header';

import { OnBoardingSessionsSuggestionsList } from '../components/on-boarding-sessions-suggestions/on-boarding-sessions-suggestions-list.component';
import { OnBoardingSessionsSuggestionsFooter } from '../components/on-boarding-sessions-suggestions/on-boarding-sessions-suggestions-footer.component';

export const OnBoardingSessionsSuggestionsScreen = () => {
  const { t } = useTranslate();

  return (
    <>
      <HeaderMascot
        title={t('on-boarding.sessions.suggestions.title')}
        description={t('on-boarding.sessions.suggestions.description')}
        mascotName="ludo-search"
        hasMascotHalo
      />
      <OnBoardingSessionsSuggestionsList />
      <OnBoardingSessionsSuggestionsFooter />
    </>
  );
};

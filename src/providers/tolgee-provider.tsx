import { Tolgee, DevTools, TolgeeProvider as TolgeeProviderNative, BackendFetch } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';

import { PropsWithChildren } from 'react';
import frFR from '../../locales/fr-FR.json';
import en from '../../locales/en.json';

const tolgee = Tolgee()
  .use(FormatIcu())
  .init({
    defaultLanguage: 'fr-FR',
    fallbackLanguage: 'en',
    staticData: {
      'fr-FR': frFR,
      en: en,
    },
  });

export default function TolgeeProvider({ children }: PropsWithChildren) {
  return <TolgeeProviderNative tolgee={tolgee}>{children}</TolgeeProviderNative>;
}

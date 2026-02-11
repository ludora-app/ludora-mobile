import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import { PropsWithChildren } from 'react';
import { FormatIcu } from '@tolgee/format-icu';
import { Tolgee, TolgeeProvider as TolgeeProviderNative } from '@tolgee/react';

import en from '../../locales/en.json';
import fr from '../../locales/fr.json';

const tolgee = Tolgee().use(FormatIcu()).init({
  defaultLanguage: 'fr',
  fallbackLanguage: 'en',
  staticData: {
    en,
    fr,
  },
});

export default function TolgeeProvider({ children }: PropsWithChildren) {
  return <TolgeeProviderNative tolgee={tolgee}>{children}</TolgeeProviderNative>;
}

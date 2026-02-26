/* eslint-disable import/extensions -- @formatjs packages require .js in paths per their "exports" */
import '@formatjs/intl-locale/polyfill.js';
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/fr.js';
/* eslint-enable import/extensions */
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

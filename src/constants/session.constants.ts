import {
  CreateSessionFromRequestDtoLevel,
} from '@/api/generated/model';

import { TIconsAll } from './icons.constants';

export type SESSION_LEVEL_TYPE = {
  code: CreateSessionFromRequestDtoLevel;
  icon: TIconsAll;
  name: string;
};

export const SESSION_LEVELS: SESSION_LEVEL_TYPE[] = [
  {
    code: 1,
    icon: 'ludo-level-easy',
    name: 'EASY',
  },
  {
    code: 2,
    icon: 'ludo-level-medium',
    name: 'MEDIUM',
  },
  {
    code: 3,
    icon: 'ludo-level-hard',
    name: 'HARD',
  },
];

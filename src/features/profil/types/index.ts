import ROUTES from '@/constants/routes.constants';

import { RootStackParamList } from '../../../types/routes-params.types';

export type ParamsFormSheetActions = RootStackParamList[typeof ROUTES.PROFIL.ACTIONS];

export type FormSheetView = 'actions' | 'report-reasons' | 'report-reasons-other';

import { list, shuffle } from 'radash';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  String,
  FormInput,
  Box,
  BoxRowCenterBetween,
  Chip,
  BoxRow,
  Icon,
  BoxGrow,
  WrapperKeyboardAwareScrollView,
} from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionTitle from '../components/create-session-title-component';
import CreateSessionFooterStep3 from '../components/create-session-footer/create-session-footer-step-3.component';
import CreateSessionStep3SectionTitle from '../components/create-session-steps/create-session-step-3/create-session-step-3-section-title.component';
import {
  createSessionStep3Schema,
  CreateSessionStep3Schema,
  DESCRIPTION_MAX_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from '../schemas/create-session-step-3.schema';

const generateRandomTitleSuggestions = () => {
  const totalVariants = 21;
  const numberOfSuggestions = 5;
  const allIndices = list(totalVariants).map((_, index) => index + 1);

  const randomIndices = shuffle(allIndices).slice(0, numberOfSuggestions);

  return randomIndices.map((variantNumber, index) => ({
    id: index,
    title: `create-session-steps-step-3.title_suggestion_${variantNumber}`,
  }));
};

export default function CreateSessionStep3Screen() {
  const router = useRouter();
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const { description, teamAName, teamBName, title } = useCreateSessionStore(
    useShallow(state => ({
      description: state.session?.description,
      teamAName: state.session?.teamAName,
      teamBName: state.session?.teamBName,
      title: state.session?.title,
    })),
  );
  const setCreateSessionData = useCreateSessionStore(state => state.setSession);
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<CreateSessionStep3Schema>({
    defaultValues: {
      description: description || undefined,
      teamAName: teamAName || undefined,
      teamBName: teamBName || undefined,
      title: title || undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(createSessionStep3Schema(t)),
  });
  const [titleSource, setTitleSource] = useState<'user' | 'suggestion'>('user');
  const suggestions = useMemo(() => generateRandomTitleSuggestions(), []);

  const onSubmit = (data: CreateSessionStep3Schema) => {
    setCreateSessionData(data);
    trackEvent({
      data: {
        has_description: data.description?.length > 0 || false,
        has_team_a_name: data.teamAName?.length > 0 || false,
        has_team_b_name: data.teamBName?.length > 0 || false,
        has_title: data.title?.length > 0 || false,
        title_source: data.title ? titleSource : 'none',
      },
      eventName: 'create_session_step_3_completed',
    });
    router.push(ROUTES.CREATE_SESSION.STEP_4);
  };

  const handlePressSuggestion = (suggestedTitle: string) => {
    setValue('title', t(suggestedTitle));
    setTitleSource('suggestion');
  };

  return (
    <>
      <WrapperKeyboardAwareScrollView contentContainerClassName="gap-5 pb-10">
        <Box>
          <CreateSessionTitle title={t('create-session-steps.step-3.title')} />
          <String colorVariant="muted" variant="body-sm">
            {t('create-session-steps.step-3.description')}
          </String>
        </Box>
        <Box>
          <CreateSessionStep3SectionTitle
            iconName="type-text-square-regular"
            title="create-session-steps-step-3.section_session_title"
          />
          <FormInput
            control={control}
            name="title"
            placeholder={t('create-session-steps-step-3.section_session_title_placeholder')}
            maxLength={TITLE_MAX_LENGTH}
            hasLengthCounter
          />
          <Box className="gap-2">
            <String colorVariant="muted" variant="body-sm">
              {t('create-session-steps-step-3.section_session_title_suggestions')}
            </String>
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <Chip
                  colorVariant="muted"
                  size="2xs"
                  title={t(item.title)}
                  titleProps={{
                    color: '#000',
                    colorVariant: 'dark',
                  }}
                  iconProps={{
                    className: 'mr-1',
                    color: '#000',
                    name: 'stars-regular',
                    position: 'left',
                  }}
                  onPress={() => handlePressSuggestion(item.title)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="items-center gap-2"
            />
          </Box>
        </Box>
        <Box>
          <CreateSessionStep3SectionTitle
            iconName="text-align-right-regular"
            title="create-session-steps-step-3.section_session_description"
          />
          <FormInput
            control={control}
            name="description"
            multiline
            maxLength={DESCRIPTION_MAX_LENGTH}
            hasLengthCounter
            placeholder={t('create-session-steps-step-3.section_session_description_placeholder')}
          />
        </Box>
        <Box>
          <CreateSessionStep3SectionTitle
            iconName="people-regular"
            title="create-session-steps-step-3.section_session_teams_names"
          />
          <BoxRowCenterBetween className="gap-3">
            <BoxGrow className="gap-1">
              <BoxRow className="items-end">
                <Icon name="ludo-king" size="xl" />
                <String>{t('create-session-steps-step-3.section_session_teams_names_team_1')}</String>
              </BoxRow>
              <FormInput
                control={control}
                name="teamAName"
                placeholder={t('create-session-steps-step-3.section_session_teams_names_team_1_placeholder')}
                maxLength={TEAM_NAME_MAX_LENGTH}
                hasLengthCounter
              />
            </BoxGrow>
            <BoxGrow className="gap-1">
              <BoxRow className="items-end">
                <Icon name="ludo-king-2" size="xl" />
                <String>{t('create-session-steps-step-3.section_session_teams_names_team_2')}</String>
              </BoxRow>
              <FormInput
                control={control}
                name="teamBName"
                className="flex-1"
                placeholder={t('create-session-steps-step-3.section_session_teams_names_team_2_placeholder')}
                maxLength={TEAM_NAME_MAX_LENGTH}
                hasLengthCounter
              />
            </BoxGrow>
          </BoxRowCenterBetween>
        </Box>
      </WrapperKeyboardAwareScrollView>
      <CreateSessionFooterStep3 onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
    </>
  );
}

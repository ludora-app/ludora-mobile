import {
  WrapperScrollView,
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

import Animated, { FadeInRight } from 'react-native-reanimated';
import CreateSessionTitle from '../../create-session-title-component';
import { useTranslate } from '@tolgee/react';
import { useForm } from 'react-hook-form';
import CreateSessionStep3SectionTitle from './create-session-step-3-section-title.component';
import {
  CreateSessionStep3Schema,
  createSessionStep3Schema,
  DESCRIPTION_MAX_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from '../../../schemas/create-session-step-3.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FlatList } from 'react-native';
import { list, shuffle } from 'radash';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import CreateSessionFooter from '../create-session-footer/create-session-footer.component';
import CreateSessionFooterStep3 from '../create-session-footer/create-session-footer-step-3.component';
import { useShallow } from 'zustand/react/shallow';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

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

type CreateSessionStep3Props = {
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionStep3(props: CreateSessionStep3Props) {
  const { setActiveStep } = props;
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const { title, description, teamAName, teamBName } = useCreateSessionStore(
    useShallow(state => ({
      title: state.session?.title,
      description: state.session?.description,
      teamAName: state.session?.teamAName,
      teamBName: state.session?.teamBName,
    })),
  );
  const setCreateSessionData = useCreateSessionStore(state => state.setSession);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateSessionStep3Schema>({
    resolver: zodResolver(createSessionStep3Schema(t)),
    mode: 'onChange',
    defaultValues: {
      title: title || undefined,
      description: description || undefined,
      teamAName: teamAName || undefined,
      teamBName: teamBName || undefined,
    },
  });
  const [titleSource, setTitleSource] = useState<'user' | 'suggestion'>('user');
  const suggestions = useMemo(() => generateRandomTitleSuggestions(), []);

  const onSubmit = (data: CreateSessionStep3Schema) => {
    setCreateSessionData(data);
    trackEvent({
      eventName: 'create_session_step_3_completed',
      data: {
        has_title: data.title?.length > 0 || false,
        title_source: data.title ? titleSource : 'none',
        has_description: data.description?.length > 0 || false,
        has_team_a_name: data.teamAName?.length > 0 || false,
        has_team_b_name: data.teamBName?.length > 0 || false,
      },
    });
    setActiveStep(prev => prev + 1);
  };

  const handlePressSuggestion = (title: string) => {
    setValue('title', t(title));
    setTitleSource('suggestion');
  };

  return (
    <>
      <Animated.View entering={FadeInRight} className="flex-1">
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
              title={'create-session-steps-step-3.section_session_title'}
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
                      colorVariant: 'dark',
                      color: '#000',
                    }}
                    iconProps={{
                      name: 'stars-regular',
                      position: 'left',
                      color: '#000',
                      className: 'mr-1',
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
              title={'create-session-steps-step-3.section_session_description'}
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
              title={'create-session-steps-step-3.section_session_teams_names'}
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
      </Animated.View>
      <CreateSessionFooterStep3 onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
    </>
  );
}

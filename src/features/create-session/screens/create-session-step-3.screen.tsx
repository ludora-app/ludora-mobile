import { list, shuffle } from 'radash';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { FlatList, Keyboard } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo, useState } from 'react';
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

import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useCreateSessionLayoutStore } from '@/features/create-session/store/create-session-layout.store';

import CreateSessionTitle from '../components/create-session-title-component';
import CreateSessionStep3SectionTitle from '../components/create-session-steps/create-session-step-3/create-session-step-3-section-title.component';
import {
  createSessionStep3Schema,
  CreateSessionStep3Schema,
  DESCRIPTION_MAX_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from '../schemas/create-session-step-3.schema';

/** Fallback si le footer n’a pas encore été mesuré (1er frame). */
const FOOTER_HEIGHT_FALLBACK = 90;

const KEYBOARD_BOTTOM_OFFSET = 80;

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
  const footerHeight = useCreateSessionLayoutStore(state => state.footerHeight);
  const toolbarOpenedOffset = footerHeight > 0 ? footerHeight : FOOTER_HEIGHT_FALLBACK;
  const { t } = useTranslate();
  const { description, teamAName, teamBName, title } = useCreateSessionStore(
    useShallow(state => ({
      description: state.session?.description,
      teamAName: state.session?.teamAName,
      teamBName: state.session?.teamBName,
      title: state.session?.title,
    })),
  );
  const setCreateSessionData = useCreateSessionStore(state => state.setSession);
  const setIsStep3Valid = useCreateSessionStore(state => state.setIsStep3Valid);

  const {
    control,
    formState: { isValid },
    setValue,
    watch,
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

  const [titleSource, setTitleSource] = useState<'user' | 'suggestion' | 'none'>('user');
  const suggestions = useMemo(() => generateRandomTitleSuggestions(), []);

  // Sync validity with store
  useEffect(() => {
    setIsStep3Valid(isValid);
  }, [isValid, setIsStep3Valid]);

  // Sync form values with store
  const watchedValues = watch();
  useEffect(() => {
    const cleanedValues = {
      description: watchedValues.description?.trim(),
      teamAName: watchedValues.teamAName?.trim(),
      teamBName: watchedValues.teamBName?.trim(),
      title: watchedValues.title?.trim(),
    };
    setCreateSessionData({
      ...cleanedValues,
      additionalData: {
        titleSource,
      },
    });
  }, [watchedValues, titleSource, setCreateSessionData]);

  const handlePressSuggestion = (suggestedTitle: string) => {
    setValue('title', t(suggestedTitle));
    setTitleSource('suggestion');
  };

  return (
    <WrapperKeyboardAwareScrollView
      contentContainerClassName="gap-5 pb-10"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      bottomOffset={KEYBOARD_BOTTOM_OFFSET}
      hasKeyboardToolbar
      keyboardToolbarProps={{
        offset: { closed: 0, opened: toolbarOpenedOffset },
      }}
    >
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
          returnKeyType="next"
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
          returnKeyType="next"
          blurOnSubmit={false}
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
              returnKeyType="next"
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
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </BoxGrow>
        </BoxRowCenterBetween>
      </Box>
    </WrapperKeyboardAwareScrollView >
  );
}

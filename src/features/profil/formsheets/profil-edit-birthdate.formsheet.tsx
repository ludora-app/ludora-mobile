import { z } from 'zod';
import { Wrapper } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';
import FormDatePickerInput from '@/components/ludo-ui/components/form/form-date-picker-input.component';

import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component';
import { ProfilEditBirthdateSchema, profilEditBirthdateSchema } from '../schemas/profil-edit-birthdate.schema';

export default function ProfilEditBirthdateFormsheet() {
  const { toast } = useToast();
  const router = useRouter();
  const { userMe } = useUserMe();
  const { birthdate: userMeBirthdate } = userMe || {};
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();
  const { t } = useTranslate();
  const { trackError, trackEvent, trackIdentity } = useAnalytics();
  const { control, handleSubmit } = useForm<z.infer<typeof profilEditBirthdateSchema>>({
    defaultValues: {
      birthdate: userMeBirthdate ? new Date(userMeBirthdate) : undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(profilEditBirthdateSchema),
  });

  const onSubmit = async (data: ProfilEditBirthdateSchema) => {
    try {
      if (data.birthdate.toISOString() === userMeBirthdate) {
        router.back();
        return;
      }
      await updateUserMe({ birthdate: data.birthdate.toISOString() });
      trackEvent({ eventName: 'profil_edit_birthdate_success' });
      trackIdentity({ birthdate: data.birthdate.toISOString() });
      toast({
        message: t('profil.profil-edit.birthdate_updated_success'),
        variant: 'success',
      });
      router.back();
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackError({ error });
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
        eventName: 'profil_edit_birthdate_failed',
      });
    }
  };

  return (
    <>
      <FormSheetHeader title={t('profil.profil-edit.birthdate_title_edit')} />
      <Wrapper fill={false} className="gap-2 pt-5 pb-20">
        <FormDatePickerInput
          name="birthdate"
          control={control}
          placeholder={t('common.input_birthdate_placeholder')}
          label={t('common.input_birthdate_label')}
          hasClearIcon={false}
          hasErrorTranslation
        />
      </Wrapper>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
    </>
  );
}

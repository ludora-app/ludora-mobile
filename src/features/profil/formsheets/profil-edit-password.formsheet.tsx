import { z } from 'zod';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { FormInput, Wrapper } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { useUpdateUserPassword } from '../queries/update-user-password.query';
import { profilEditPasswordSchema } from '../schemas/profil-edit-password.schema';
import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component';

export default function ProfilEditPasswordFormsheet() {
  const { toast } = useToast();
  const router = useRouter();
  const { isPending: isUpdatingUserPassword, mutateAsync: updateUserPassword } = useUpdateUserPassword();
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const schema = profilEditPasswordSchema(t);
  const { control, handleSubmit, setError } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const updatePasswordData = {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      };
      await updateUserPassword(updatePasswordData);
      toast({
        message: t('profil.profil-edit.password_updated_success'),
        variant: 'success',
      });
      trackEvent({ eventName: 'profil_edit_password_success' });
      router.back();
    } catch (error) {
      const responseError = error as ErrorResponse;
      trackEvent({
        data: { error_message: responseError.api_error_detail ?? 'Unknown error' },
        eventName: 'profil_edit_password_failed',
      });
      if (responseError?.api_error_detail === 'Invalid credentials') {
        setError('oldPassword', {
          message: t('profil.profil-edit.old_password_incorrect'),
        });
        return;
      }
      if (responseError?.api_error_detail === 'New password cannot be the same as the old password') {
        setError('newPassword', {
          message: t('profil.profil-edit.new_password_same_as_old'),
        });
        return;
      }
      trackError({ error });
    }
  };

  return (
    <>
      <FormSheetHeader title={t('profil.profil-edit.password_title_edit')} />
      <Wrapper fill={false} className="gap-2 pt-5 pb-20">
        <FormInput
          name="oldPassword"
          placeholder={t('profil.profil-edit.old_password_placeholder')}
          control={control}
          label={t('profil.profil-edit.old_password_label')}
          secureTextEntry
        />
        <FormInput
          name="newPassword"
          placeholder={t('profil.profil-edit.new_password_placeholder')}
          control={control}
          label={t('profil.profil-edit.new_password_label')}
          secureTextEntry
        />
        <FormInput
          name="confirmPassword"
          placeholder={t('common.input_confirm_password_placeholder')}
          control={control}
          label={t('common.input_confirm_password_label')}
          secureTextEntry
        />
      </Wrapper>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserPassword} />
    </>
  );
}

import { z } from 'zod';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormInput, WrapperGestureHandlerScrollView } from '@ludo/ui';

import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component';
import { MAX_BIO_LENGTH, profilEditBioSchema } from '../schemas/profil-edit-bio.schema';

export default function ProfilEditBioFormsheet() {
  const router = useRouter();
  const { userMe } = useUserMe();
  const { bio: userMeBio } = userMe || {};
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const { toast } = useToast();
  const schema = profilEditBioSchema(t);
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      bio: userMeBio ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      if (data.bio === userMeBio) {
        router.back();
        return;
      }
      await updateUserMe(data);
      const isBioAdded = !userMeBio && data.bio;
      const isBioUpdated = userMeBio && data.bio;
      const isBioRemoved = userMeBio && !data.bio;
      if (isBioAdded) {
        toast({
          message: t('profil.profil-edit.bio_added_success'),
          variant: 'success',
        });
      } else if (isBioUpdated) {
        toast({
          message: t('profil.profil-edit.bio_updated_success'),
          variant: 'success',
        });
      } else if (isBioRemoved) {
        toast({
          message: t('profil.profil-edit.bio_removed_success'),
          variant: 'success',
        });
      }
      trackEvent({
        data: { is_bio_added: !!isBioAdded, is_bio_removed: !!isBioRemoved, is_bio_updated: !!isBioUpdated },
        eventName: 'profil_edit_bio_success',
      });
      router.back();
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackError({ error });
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
        eventName: 'profil_edit_bio_failed',
      });
    }
  };

  return (
    <Box collapsable={false}>
      <FormSheetHeader
        title={t(userMeBio ? 'profil.profil-edit.bio_title_edit' : 'profil.profil-edit.bio_title_add')}
      />
      <WrapperGestureHandlerScrollView fill={false} className="gap-2 pt-5 pb-20">
        <FormInput
          control={control}
          name="bio"
          placeholder={t('profil.profil-edit.bio_placeholder')}
          label={t('profil.profil-edit.bio_label')}
          multiline
          inputContainerClassName="min-h-16"
          hasLengthCounter
          maxLength={MAX_BIO_LENGTH}
        />
      </WrapperGestureHandlerScrollView>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
    </Box>
  );
}

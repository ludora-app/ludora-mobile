import { z } from 'zod';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { Chip, Wrapper } from '@ludo/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { UpdateUserDtoSex } from '@/api/generated/model';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component';
import { profilEditSexSchema, ProfilEditSexSchema } from '../schemas/profil-edit-sex.schema';

type SexOption = {
  label: string;
  value: UpdateUserDtoSex;
};

const SEX_OPTIONS: SexOption[] = [
  { label: 'common.MALE', value: 'MALE' },
  { label: 'common.FEMALE', value: 'FEMALE' },
  { label: 'common.OTHER', value: 'OTHER' },
];

export default function ProfilEditSexFormsheet() {
  const { toast } = useToast();
  const { t } = useTranslate();
  const router = useRouter();
  const { userMe } = useUserMe();
  const { sex: userMeSex } = userMe || {};
  const { trackError, trackEvent, trackIdentity } = useAnalytics();
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();

  const { handleSubmit, setValue, watch } = useForm<z.infer<typeof profilEditSexSchema>>({
    defaultValues: {
      sex: userMeSex ?? undefined,
    },
    resolver: zodResolver(profilEditSexSchema),
  });

  const selectedSex = watch('sex');

  const onSubmit = async (data: ProfilEditSexSchema) => {
    try {
      if (data.sex === userMeSex) {
        router.back();
        return;
      }
      await updateUserMe(data);
      const isSexAdded = !userMeSex && data.sex;
      const isSexUpdated = userMeSex && data.sex;
      trackEvent({
        data: { is_sex_added: !!isSexAdded, is_sex_updated: !!isSexUpdated },
        eventName: 'profil_edit_sex_success',
      });
      trackIdentity({ gender: data.sex });
      if (isSexAdded) {
        toast({
          message: t('profil.profil-edit.sex_added_success'),
          variant: 'success',
        });
      } else if (isSexUpdated) {
        toast({
          message: t('profil.profil-edit.sex_updated_success'),
          variant: 'success',
        });
      }
      router.back();
    } catch (error) {
      const responseError = error as ErrorResponse;
      trackError({ error });
      trackEvent({
        data: { error_message: responseError?.api_error_detail ?? 'Unknown error' },
        eventName: 'profil_edit_sex_failed',
      });
    }
  };

  const handleSelectSex = (sex: UpdateUserDtoSex) => {
    setValue('sex', sex);
  };

  return (
    <>
      <FormSheetHeader
        title={t(userMeSex ? 'profil.profil-edit.sex_title_edit' : 'profil.profil-edit.sex_title_add')}
      />
      <Wrapper fill={false} className="flex-row gap-2 pt-5 pb-20">
        {SEX_OPTIONS.map(sex => (
          <Chip
            key={sex.value}
            title={t(sex.label)}
            className="flex-1"
            variant={selectedSex === sex.value ? 'contained' : 'outlined'}
            onPress={() => handleSelectSex(sex.value)}
          />
        ))}
      </Wrapper>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
    </>
  );
}

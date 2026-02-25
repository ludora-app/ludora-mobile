import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxGrow, BoxRowGrow } from '@chillui/ui';
import { Avatar, BoxRow, Icon, Image, Link, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { getSportImage } from '@/utils/sports.utils';
import { SportPreferenceResponseData } from '@/api/generated/model';


interface ProfilSection1Props {
  isMe: boolean;
  lastname?: string;
  firstname?: string;
  avatarUrl?: string | null;
  sportPreferences?: readonly SportPreferenceResponseData[];
}

export default function ProfilSection1(props: ProfilSection1Props) {
  const { avatarUrl, firstname, isMe, lastname, sportPreferences } = props;
  const { t } = useTranslate();

  const hasSports = sportPreferences && sportPreferences.length > 0;

  const renderSportsContent = () => {
    if (hasSports) {
      return (
        <BoxRow className="items-center gap-1">
          {sportPreferences.map((sportPreference) => (
            <Image
              key={sportPreference.uid}
              source={getSportImage(sportPreference.sport)}
              className='size-6 rounded-lg'
            />
          ))}
        </BoxRow>
      );
    }

    if (isMe) {
      return (
        <Link href={ROUTES.SETTINGS.PREFERENCES} asChild>
          <Pressable className='flex-row items-center justify-between'>
            <String colorVariant="muted" variant="body-sm">
              {t("profil.add_sports_description", "Ajoute tes sports préférés !")}
            </String>
            <Icon name="e-pen-regular" color={COLORS.primary} size="sm" className='mr-1' />
          </Pressable>
        </Link>
      );
    }

    return (
      <String colorVariant="muted" variant="body-sm">
        {t("profil.no_favorite_sports", "Pas encore de sports favoris")}
      </String>
    );
  };

  return (
    <BoxRow className='items-center'>
      <BoxRowGrow className='gap-2'>
        <Avatar
          data={{
            firstname,
            imageUrl: avatarUrl,
            lastname,
          }}
          className='rounded-2xl'
          size="xl"
        />
        <BoxGrow className='gap-1'>
          <String variant="body-3" font="primaryBold" truncate>{firstname} {lastname}</String>
          {renderSportsContent()}
        </BoxGrow>
      </BoxRowGrow>
    </BoxRow>
  );
}

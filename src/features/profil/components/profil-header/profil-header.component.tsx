import { useTranslate } from '@tolgee/react';

import { HeaderOutlined } from '@/components/ui/navigation/header-outlined';

import ProfilHeaderActionsMe from './profil-header-actions-me.component';
import ProfilHeaderActions from './profil-header-actions/profil-header-actions.component';

interface ProfilHeaderProps {
  isMe: boolean;
  lastname: string;
  firstname: string;
}

export default function ProfilHeader(props: ProfilHeaderProps) {
  const { t } = useTranslate();
  const { firstname, isMe: isProfilMe, lastname } = props;

  return (
    <HeaderOutlined
      fontSize={32}
      showBackButton={!isProfilMe}
      hasHorizontalPadding
      hasTopSafeArea
      title={isProfilMe ? t('profil.me_header_title') : t('profil.user_header_title')}
      rightContent={
        <>
          <ProfilHeaderActionsMe isMe={isProfilMe} />
          <ProfilHeaderActions isMe={isProfilMe} firstname={firstname} lastname={lastname} />
        </>
      }
    />
  );
}

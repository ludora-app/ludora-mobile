import { useTranslate } from '@tolgee/react';
import { Box, BoxGrow, Button, ScrollView, Separator, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { IS_IOS } from '@/constants/platform.constants';

import { AuthSwitchLink } from '../../components/auth-switch-link.component';
import { AuthHeaderHero } from '../../components/auth-header/auth-header-hero.component';
import { LoginSocialNetworks } from '../../login/components/login-social-networks/login-social-networks.component';

export const RegisterStep1Screen = () => {
  const { t } = useTranslate();

  return (
    <BoxGrow className="bg-background">
      <ScrollView contentContainerClassName="grow" bounces={false} stickyHeaderIndices={[]}>
        <AuthHeaderHero mascotName="ludo-sunglass" />
        <BoxGrow className="gap-3 px-5 pt-6.5">
          <Box className="mb-2 gap-3">
            <String className="text-center" variant="title-3">
              {t('auth.register-step-1.create_account_title')}
            </String>
            <String className="text-center">{t('auth.register-step-1.create_account_description')}</String>
          </Box>
          <LoginSocialNetworks flow="register" />
          <Separator title={t('common.or')} />
          <Button
            title={t('auth.register-step-1.register_with_email')}
            redirect={ROUTES.AUTH.REGISTER_STEP_2}
            className="w-full"
            size="xl"
            iconProps={{
              ...(IS_IOS && { className: 'mr-2' }),
              name: 'email-solid',
              position: IS_IOS ? 'left' : 'left-outside',
            }}
          />
          <AuthSwitchLink
            href={ROUTES.AUTH.LOGIN}
            question={t('auth.register.dont_have_an_account')}
            actionTitle={t('auth.register.dont_have_an_account_create_account')}
          />
        </BoxGrow>
      </ScrollView>
    </BoxGrow>
  );
};

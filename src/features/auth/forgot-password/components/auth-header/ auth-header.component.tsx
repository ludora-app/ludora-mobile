import { Box, String } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { useTranslate } from '@tolgee/react';

type AuthHeaderProps = {
  description?: string;
  title: string;
};

export default function AuthHeader(props: PropsWithChildren<AuthHeaderProps>) {
  const { children, description, title } = props;
  const { t } = useTranslate();

  return (
    <Box className="gap-3">
      <String variant="title-2" font="primaryExtraBold">
        {t(title)}
      </String>

      {description && <String>{t(description)}</String>}
      {children}
    </Box>
  );
}

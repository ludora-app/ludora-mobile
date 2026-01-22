import { Box, String } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { useTranslate } from '@tolgee/react';

type AuthHeaderProps = {
  description?: string;
  title?: string;
};

export default function AuthHeader(props: PropsWithChildren<AuthHeaderProps>) {
  const { children, description, title } = props;
  const { t } = useTranslate();

  return (
    <Box className="gap-3 mt-5">
      {!!title && <String variant="title-1" font="primaryExtraBold" className='text-center'>
        {t(title)}
      </String>}

      {description && <String className='text-center'>{t(description)}</String>}
      {children}
    </Box>
  );
}

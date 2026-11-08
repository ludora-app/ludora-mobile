import { Pressable } from 'react-native';
import { Box, Link, String } from '@ludo/ui';

import { RouteValues } from '@/constants/routes.constants';

type AuthSwitchLinkProps = {
  actionTitle: string;
  href?: RouteValues;
  onPress?: () => void;
  question?: string;
};

export const AuthSwitchLink = (props: AuthSwitchLinkProps) => {
  const { actionTitle, href, onPress, question } = props;

  const content = (
    <Pressable className="flex-row items-center justify-center" onPress={onPress}>
      {!!question && <String>{question} </String>}
      <String font="primaryExtraBold" colorVariant="primary" className="underline">
        {actionTitle}
      </String>
    </Pressable>
  );

  return (
    <Box className="mt-auto pt-5">
      {href ? (
        <Link href={href} asChild replace>
          {content}
        </Link>
      ) : (
        content
      )}
    </Box>
  );
};

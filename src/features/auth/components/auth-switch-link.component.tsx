import { Pressable } from 'react-native';
import { Box, Link, String } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { RouteValues } from '@/constants/routes.constants';

type AuthSwitchLinkProps = {
  actionTitle: string;
  href: RouteValues;
  question: string;
};

export const AuthSwitchLink = (props: AuthSwitchLinkProps) => {
  const { actionTitle, href, question } = props;
  const { bottom } = useSafeArea();

  return (
    <Box className="mt-auto pt-5" style={{ paddingBottom: bottom + 8 }}>
      <Link href={href} asChild replace>
        <Pressable className="flex-row items-center justify-center">
          <String>{question} </String>
          <String font="primaryExtraBold" colorVariant="primary" className="underline">
            {actionTitle}
          </String>
        </Pressable>
      </Link>
    </Box>
  );
};

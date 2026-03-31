import { Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { OutlinedString } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

type ChatRoomInfoHeaderProps = {
  titleKey: string;
};

export default function ChatRoomInfoHeader({ titleKey }: ChatRoomInfoHeaderProps) {
  const { t } = useTranslate();
  const { safeTop } = useSafeArea();

  return (
    <Wrapper className="z-10 flex-row items-center gap-2 pb-4" style={{ paddingTop: safeTop }}>
      <GoBackButton />
      <OutlinedString
        text={t(titleKey)}
        fontSize={28}
        fillColor="#FFFFFF"
        strokeColor={COLORS.primary}
        strokeWidth={2}
        fontFamily="NunitoSans700Bold"
        className="mt-2"
      />
    </Wrapper>
  );
}

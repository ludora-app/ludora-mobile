import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Avatar, Box, BoxRow, BoxRowCenterBetween, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FindOneSessionResponseData } from '@/api/generated/model';

type SessionCreatorSectionCardProps = {
  creator: FindOneSessionResponseData['creator'];
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
});

export default function SessionCreatorSectionCard(props: SessionCreatorSectionCardProps) {
  const { t } = useTranslate();
  const { creator } = props;
  const { firstname, sessionsCount } = creator || {};
  return (
    <BoxRowCenterBetween className="border-ring/30 rounded-xl border bg-white p-2" style={styles.shadow}>
      <BoxRow className="items-center gap-2">
        <Avatar data={creator} />
        <Box>
          <String font="primaryBold">{firstname}</String>
          <String variant="body-sm">{t('session.creator-section.sessions_count', { count: sessionsCount })}</String>
        </Box>
      </BoxRow>
      <IconButton iconName="chatbot-regular" variant="outlined" iconColor={COLORS.primary} rounded="circle" />
    </BoxRowCenterBetween>
  );
}

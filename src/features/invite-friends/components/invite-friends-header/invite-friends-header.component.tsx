import { Box, String } from '@ludo/ui';

export default function InviteFriendsHeader() {
  return (
    <Box>
      <String variant="title-1" font="primaryBold">
        Inviter tes amis
      </String>
      <String colorVariant="muted">Sélectionne les amis à inviter à cette session</String>
    </Box>
  );
}

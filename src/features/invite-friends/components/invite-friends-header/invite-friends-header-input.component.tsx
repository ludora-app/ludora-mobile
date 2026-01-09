import { useForm } from 'react-hook-form';
import { Box, FormInput } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { inviteFriendsSearchSchema } from '../../schemas/invite-friends.schema';
import InviteFriendsHeaderInvitedFriends from './invite-friends-header-invited-friends.component';

export default function InviteFriendsHeaderInput() {
  const { control, watch } = useForm({
    defaultValues: { search: '' },
    resolver: zodResolver(inviteFriendsSearchSchema),
  });
  return (
    <Box className="gap-3 bg-background py-2">
      <FormInput
        control={control}
        name="search"
        placeholder="Rechercher un ami..."
        leftIconAction={{ color: '#000', name: 'search-regular', size: 'sm' }}
      />
      <InviteFriendsHeaderInvitedFriends />
    </Box>
  );
}

import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, BoxRow, BoxRowCenterBetween, Button, IconButton, String, WrapperSafeAreaView } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { Avatar } from '@/components/chill-ui-library';

import InviteFriendsList from '../components/invite-friends-list/invite-friends-list.component';

const schema = z.object({
  search: z.string().min(0),
});

const MOCK_FRIENDS = [
  { avatar: '👨', id: 1, name: 'John Doe' },
  { avatar: '�', id: 2, name: 'Jane Smith' },
  { avatar: '�', id: 3, name: 'Mike Johnson' },
  { avatar: '�', id: 4, name: 'Sarah Williams' },
  { avatar: '�', id: 5, name: 'Tom Brown' },
  { avatar: '�', id: 6, name: 'Emma Davis' },
];

export default function InviteFriendsScreen() {
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const { control, watch } = useForm({
    defaultValues: { search: '' },
    resolver: zodResolver(schema),
  });

  const searchValue = watch('search');
  const filteredFriends = MOCK_FRIENDS.filter(friend => friend.name.toLowerCase().includes(searchValue.toLowerCase()));

  const toggleFriend = (id: number) => {
    setSelectedFriends(prev => (prev.includes(id) ? prev.filter(friendId => friendId !== id) : [...prev, id]));
  };

  const renderFriendItem = ({ item }: { item: (typeof MOCK_FRIENDS)[0] }) => {
    const isSelected = selectedFriends.includes(item.id);
    return (
      <BoxRowCenterBetween className="mb-3 rounded-2xl bg-black/10 px-4 py-3">
        <BoxRow className="flex-1 items-center gap-3">
          <Avatar
            data={{
              firstname: 'meber',
              image_url: 'https://picsum.photos/200/300',
              lastname: 'amir',
            }}
          />
          <Box className="flex-1">
            <String className="text-gray-900 text-base font-semibold">{item.name}</String>
          </Box>
        </BoxRow>
        <IconButton
          onPress={() => toggleFriend(item.id)}
          iconName="profil-add-regular"
          variant="outlined"
          iconColor={COLORS.primary}
          rounded="circle"
        />
      </BoxRowCenterBetween>
    );
  };

  return (
    <WrapperSafeAreaView className="flex-1 bg-background">
      {/* <Box className="gap-4 px-4 py-4">
        <Box className="gap-2">
          <String variant="title-1" font="primaryBold" className="text-2xl">
            Inviter tes amis
          </String>
          <String className="text-gray-600 text-sm">Sélectionne les amis à inviter à cette session</String>
        </Box>

        <FormInput control={control} name="search" placeholder="Rechercher un ami..." />

        <Box className="flex-row items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
          <Icon name="check-circle-solid-colored" color="#F15924" />
          <String className="text-sm font-medium text-primary">
            lol{selectedFriends.length} ami{selectedFriends.length > 1 ? 's' : ''} sélectionné
            {selectedFriends.length > 1 ? 's' : ''}kkkk
          </String>
        </Box>
      </Box> */}

      <InviteFriendsList />

      <Box className="gap-3 px-4 py-4">
        <Button title={`Inviter ${selectedFriends.length > 0 ? `(${selectedFriends.length})` : ''}`} />
        <Button title="Annuler" variant="outlined" />
      </Box>
    </WrapperSafeAreaView>
  );
}

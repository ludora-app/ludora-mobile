import { useRef, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Avatar, Box, Icon, String } from '@ludo/ui';
import Animated, { FadeIn } from 'react-native-reanimated';

import COLORS from '@/constants/colors.contstants';
import { FriendResponseData } from '@/api/generated/model';

import { useInviteFriendsStore } from '../../stores/invite-friends.store';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 10px 5px rgba(0, 0, 0, 0.1)',
  },
});

export default function InviteFriendsHeaderInvitedFriends() {
  const friends = useInviteFriendsStore(state => state.friends);
  const removeFriend = useInviteFriendsStore(state => state.removeFriend);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current && friends.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: friends.length - 1,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }, [friends.length]);

  if (friends.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: FriendResponseData }) => (
    <AnimatedBox className="w-16" entering={FadeIn}>
      <Box>
        <Avatar
          key={item.friendUid}
          data={{ firstname: item.firstname, imageUrl: item.avatarUrl, lastname: item.lastname }}
        />
        <Icon
          name="close-circle-bulk"
          size="sm"
          className="absolute bottom-0 right-0 rounded-full bg-white"
          color={COLORS.primary}
          onPress={() => removeFriend(item)}
        />
      </Box>
      <String size="xs" truncate className="text-center" colorVariant="muted">
        {item.firstname} {item.lastname}
      </String>
    </AnimatedBox>
  );

  return (
    <AnimatedBox className="mb-3 gap-0.5 bg-white pb-2" style={styles.shadow} entering={FadeIn}>
      <FlatList
        ref={flatListRef}
        keyExtractor={item => item?.friendUid?.toString()}
        data={friends}
        renderItem={renderItem}
        horizontal
        contentContainerClassName="gap-2 px-4"
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </AnimatedBox>
  );
}

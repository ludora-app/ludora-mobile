import { useUserMe } from '@/queries';
import ROUTES from '@constants/ROUTES';
import { TIcons } from '@constants/ICONS';
import { useEffect, useState } from 'react';
import { FlatList, LogBox } from 'react-native';
import { ChatRoomUsers } from '@api/utils/api.types';
import { ConfirmationModal } from '@components/modals';
import { RootStackScreenProps } from '@navigation/types/authNavigationTypes';
import { Avatar, Badge, Box, Button, Icon, Separator, String, Wrapper, RipplePressable } from '@components/nysaUi';

import { useChatRoomRouter } from '../hooks/useChatRoomRouter';
import ChatRoomInfoGroupUsersMenu from '../components/chat-room-info-group/ChatRoomInfoGroupUsersMenu.modal';
import { useGetUsersByChatRoomId } from '../queries/useGetUsersByChatRoomId';

type ChatRoomInfoGroupScreenProps = {
  navigation: RootStackScreenProps;
};

type ButtonItems = {
  label: string;
  icon: keyof TIcons;
  onPress: (index: number) => void;
  description?: string;
  show: boolean;
};

export default function ChatRoomInfoGroupScreen({ navigation }: ChatRoomInfoGroupScreenProps) {
  // Ignore warning about nested FlatList
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const chatRoomData = useChatRoomRouter();
  const isEvent = chatRoomData.isEvent;
  const { data: usersData } = useGetUsersByChatRoomId(chatRoomData.chatRoomId);
  const { data: userMeData } = useUserMe();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isUsersMenuVisible, setIsUsersMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<ChatRoomUsers | null>(null);
  const buttonItems: ButtonItems[] = [
    {
      description: 'Voulez-vous vraiment effacer le discussion ?',
      icon: 'trash-solid',
      label: 'Effacer le discussion',
      onPress: index => {
        setSelectedItem(index);
        setIsConfirmationModalVisible(true);
      },
      show: true,
    },
    {
      description: 'Les 10 dernieres messages de ce groupe seront transférés a Nysa et ce groupe sera signalé.',
      icon: 'warning-solid',
      label: 'Signaler ce groupe',
      onPress: index => {
        setSelectedItem(index);
        setIsConfirmationModalVisible(true);
      },
      show: true,
    },
    {
      description: 'Voulez-vous vraiment quitter le groupe ?',
      icon: 'person-to-door-solid',
      label: 'Quitter le groupe',
      onPress: index => {
        setSelectedItem(index);
        setIsConfirmationModalVisible(true);
      },
      show: !isEvent,
    },
  ];

  return (
    <Wrapper scrollView>
      {selectedUser && (
        <ChatRoomInfoGroupUsersMenu
          userData={selectedUser}
          visible={isUsersMenuVisible}
          setVisible={setIsUsersMenuVisible}
        />
      )}
      <Box className="items-start py-2">
        <Icon variant="arrow-left-solid" wrapper onPress={navigation.goBack} />
      </Box>
      <Box className="items-center gap-2">
        <Avatar
          size="2xl"
          userData={{
            firstname: chatRoomData.chatRoomName,
            image_url: chatRoomData.chatRoomAvatar,
          }}
        />
        <String size="xl" weight="semiBold">
          {chatRoomData.chatRoomName}
        </String>
        <String size="sm" weight="regular">
          {usersData?.total} membres
        </String>
        {!isEvent && (
          <Button
            leftIcon="user-plus-solid"
            title="Ajouter un membre"
            variant="secondary"
            size="xs"
            onPress={() =>
              navigation.navigate(ROUTES.friendsModal, {
                chatRoomId: chatRoomData.chatRoomId,
                type: 'add_to_group',
              })
            }
          />
        )}
      </Box>
      <Separator className="my-5" />
      <Box className="relative z-50 max-h-96">
        <String weight="semiBold" className="mb-4">
          Membres du groupe
        </String>
        <FlatList
          data={usersData?.items}
          contentContainerClassName="gap-4"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          ListHeaderComponent={() => (
            <Box className="flex-row items-center justify-between">
              <Box className="flex-row items-center gap-4">
                <Avatar
                  size="sm"
                  userData={{
                    firstname: userMeData?.firstname ?? '',
                    image_url: userMeData?.image_url ?? '',
                    lastname: userMeData?.lastname ?? undefined,
                  }}
                />
                <String size="sm" weight="regular">
                  Vous
                </String>
              </Box>
              {chatRoomData.isAdmin && <Badge size="xs">Admin</Badge>}
            </Box>
          )}
          renderItem={({ item }) => (
            <RipplePressable
              className="flex-row items-center justify-between"
              onPress={() => {
                setSelectedUser(item);
                setIsUsersMenuVisible(true);
              }}
            >
              <Box className="flex-row items-center gap-4">
                <Avatar
                  size="sm"
                  userData={{
                    firstname: item.firstname,
                    image_url: item.image_url,
                    lastname: item.lastname,
                  }}
                />
                <String size="sm" weight="regular">
                  {item.firstname} {item.lastname}
                </String>
              </Box>
              {item.is_admin && <Badge>Admin</Badge>}
            </RipplePressable>
          )}
        />
      </Box>
      <Separator className="my-5" />
      {buttonItems
        .filter(item => item.show)
        .map((item, index) => (
          <RipplePressable
            key={index}
            className="flex-row items-center gap-3 px-2 py-4"
            onPress={() => {
              item.onPress(index);
            }}
          >
            <Icon variant={item.icon} size="sm" color="#FF0000" />
            <String weight="semiBold" variant="error">
              {item.label}
            </String>
          </RipplePressable>
        ))}
      {selectedItem !== null && (
        <ConfirmationModal
          visible={isConfirmationModalVisible}
          setVisible={setIsConfirmationModalVisible}
          title={buttonItems[selectedItem].label ?? ''}
          description={buttonItems[selectedItem].description ?? ''}
          onConfirm={() => {}}
        />
      )}
    </Wrapper>
  );
}

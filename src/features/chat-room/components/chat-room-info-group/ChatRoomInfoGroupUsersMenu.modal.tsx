import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatRoomUsers } from '@api/utils/api.types';
import { ConfirmationModal } from '@components/modals';
import { Dialog, DialogContent, Box, String, Separator, Icon } from '@components/nysaUi';

import { useChatRoomRouter } from '../../hooks/useChatRoomRouter';

interface ChatRoomInfoGroupUsersMenuProps {
  visible: boolean;
  userData: ChatRoomUsers;
  setVisible: (visible: boolean) => void;
}

type MenuItem = {
  label: string;
  description?: string;
  onPress: (index: number) => void;
  show: boolean;
};

export default function ChatRoomInfoGroupUsersMenu({ setVisible, userData, visible }: ChatRoomInfoGroupUsersMenuProps) {
  const chatRoomData = useChatRoomRouter();
  const isAdmin = chatRoomData.isAdmin;
  const isEvent = chatRoomData.isEvent;
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: `Envoyer un message à ${userData?.firstname} ${userData?.lastname}`,
      onPress: () => {},
      show: true,
    },
    {
      label: `Voir le profil de ${userData?.firstname} ${userData?.lastname}`,
      onPress: () => {},
      show: true,
    },
    {
      description: 'Voulez-vous vraiment nommer ce membre admin du groupe ?',
      label: `Nommer ${userData?.firstname} ${userData?.lastname} admin du groupe`,
      onPress: index => {
        setVisible(false);
        setSelectedItem(index);
        setIsConfirmationModalVisible(true);
      },
      show: isAdmin,
    },
    {
      description: 'Voulez-vous vraiment supprimer ce membre du groupe ?',
      label: `Supprimer ${userData?.firstname} ${userData?.lastname} du groupe`,
      onPress: index => {
        setVisible(false);
        setSelectedItem(index);
        setIsConfirmationModalVisible(true);
      },
      show: isAdmin && !isEvent,
    },
  ];
  return (
    <>
      {selectedItem !== null && (
        <ConfirmationModal
          visible={isConfirmationModalVisible}
          setVisible={setIsConfirmationModalVisible}
          title={menuItems[selectedItem].label}
          description={menuItems[selectedItem].description ?? ''}
          onConfirm={() => {}}
        />
      )}
      <Dialog>
        <DialogContent visible={visible} setVisible={setVisible} closeMark>
          <Box>
            {menuItems
              .filter(item => item.show)
              .map((item, index) => (
                <Box key={index}>
                  <TouchableOpacity
                    className="py-3 flex-row items-center gap-3"
                    onPress={() => {
                      item.onPress(index);
                    }}
                  >
                    {index === 0 && <Icon variant="message-solid" size="sm" />}
                    {index === 1 && <Icon variant="user-solid" size="sm" />}
                    {index === 2 && <Icon variant="crown-solid" size="sm" />}
                    {index === 3 && <Icon variant="trash-solid" size="sm" color="#FF0000" />}
                    <String size="sm" variant={index === 3 ? 'error' : 'light'}>
                      {item.label}
                    </String>
                  </TouchableOpacity>

                  {menuItems.filter(item => item.show).length > index + 1 && <Separator className="my-2" />}
                </Box>
              ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

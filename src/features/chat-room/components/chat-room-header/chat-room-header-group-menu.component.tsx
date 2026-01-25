import { useState } from 'react';
import ROUTES from '@constants/ROUTES';
import { Icon } from '@components/nysaUi';
import { TIcons } from '@constants/ICONS';
import { ConfirmationModal } from '@components/modals';
import useNavigationHelper from '@helpers/useNavigationHelper';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemLabel } from '@components/nysaUi';

import { useChatRoomRouter } from '../../hooks/useChatRoomRouter';

type MenuItem = {
  label: string;
  icon: keyof TIcons;
  onPress: (index: number) => void;
  description?: string;
};

export default function ChatRoomHeaderGroupMenu() {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const chatRoomData = useChatRoomRouter();
  const navigation = useNavigationHelper();

  const menuItems: MenuItem[] = [
    {
      icon: 'circle-info-solid',
      label: 'Infos du groupe',
      onPress: () => {
        navigation.navigate(ROUTES.chatRoomInfoGroupScreen, chatRoomData);
      },
    },
    {
      description: 'Voulez-vous vraiment effacer le discussion ?',
      icon: 'trash-solid',
      label: 'Effacer le discussion',
      onPress: index => {
        setSelectedItem(index);
        setVisible(true);
      },
    },
    {
      description: 'Les 10 dernieres messages de ce groupe seront transférés a Nysa et ce groupe sera signalé.',
      icon: 'warning-solid',
      label: 'Signaler ce groupe',
      onPress: index => {
        setSelectedItem(index);
        setVisible(true);
      },
    },
    {
      description: 'Voulez-vous vraiment quitter le groupe ?',
      icon: 'person-to-door-solid',
      label: 'Quitter le groupe',
      onPress: index => {
        setSelectedItem(index);
        setVisible(true);
      },
    },
  ];
  return (
    <>
      {selectedItem && (
        <ConfirmationModal
          visible={visible}
          setVisible={setVisible}
          title={menuItems[selectedItem].label}
          description={menuItems[selectedItem].description || ''}
          onConfirm={() => {}}
        />
      )}
      <Menu>
        <MenuTrigger>
          <Icon variant="ellipsis-vertical-solid" size="md" wrapper />
        </MenuTrigger>
        <MenuContent position="bottom end" className="-mt-2">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              leftIcon={item.icon}
              onPress={() => {
                item.onPress(index);
              }}
            >
              <MenuItemLabel>{item.label}</MenuItemLabel>
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
    </>
  );
}

import { useState } from 'react';
import { TIcons } from '@constants/ICONS';
import { Icon } from '@components/nysaUi';
import { ConfirmationModal } from '@components/modals';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemLabel } from '@components/nysaUi';

type MenuItem = {
  label: string;
  icon: keyof TIcons;
  onPress: () => void;
  description?: string;
};

export default function ChatRoomHeaderPrivateMenu() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: 'user-solid',
      label: 'Voir le profil',
      onPress: () => {
        setVisible(true);
      },
    },
    {
      description: 'Voulez-vous vraiment effacer le discussion ?',
      icon: 'trash-solid',
      label: 'Effacer le discussion',
      onPress: () => {
        setVisible(true);
      },
    },
    {
      description:
        'Les 10 dernieres messages de cette discussion seront transférés a Nysa et cette discussion sera signalée.',
      icon: 'warning-solid',
      label: "Signaler l'utilisateur",
      onPress: () => {
        setVisible(true);
      },
    },
    {
      description: "Voulez-vous vraiment bloquer l'utilisateur ?",
      icon: 'hand-solid',
      label: "Bloquer l'utilisateur",
      onPress: () => {
        setVisible(true);
      },
    },
  ];

  return (
    <>
      {!!selectedItem && (
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
                setSelectedItem(index);
                setVisible(true);
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

import { HeaderOutlined } from '@/components/ui/navigation/header-outlined';

type ChatRoomInfoHeaderProps = {
  titleKey: string;
};

export default function ChatRoomInfoHeader({ titleKey }: ChatRoomInfoHeaderProps) {
  return <HeaderOutlined titleKey={titleKey} hasHorizontalPadding hasTopSafeArea />;
}

import { TIcons } from "@/constants/ICONS";

export type IconProps = {
  onPress?: () => void;
  wrapper?: boolean;
  color?: string;
  variant: keyof TIcons;
  className?: string;
};

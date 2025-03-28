import { Pressable } from "react-native";
import { useState } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { IconProps as props } from "../utils/types";
import CustomIcon from "./CustomIcon";
import { cn } from "../cn";

// padding  variant
const paddingVr = tv({
  base: "p-0",
  variants: {
    size: {
      "2xs": "p-0.5",
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
      "2xl": "p-6",
      "3xl": "p-7",
    },
  },
});
const IconSizeVr = tv({
  base: "w-6 h-6",
  variants: {
    size: {
      "2xs": "w-3 h-3",
      xs: "w-4 h-4",
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
      xl: "w-8 h-8",
      "2xl": "w-9 h-9",
      "3xl": "w-10 h-10",
    },
  },
});

type IconProps = props &
  VariantProps<typeof IconSizeVr> &
  VariantProps<typeof paddingVr>;

export default function Icon({
  onPress,
  size = "md",
  wrapper,
  color = "#fff",
  variant,
  className,
}: IconProps) {
  const [isPressded, setIsPressded] = useState(false);

  if (!onPress) {
    return (
      <CustomIcon
        name={variant}
        className={cn(IconSizeVr({ size }), className)}
        color={color}
      />
    );
  }

  return (
    <Pressable
      className={cn(
        "rounded-full",
        wrapper && paddingVr({ size }),
        isPressded ? "bg-darkLight" : "bg-transparent"
      )}
      onPressIn={() => setIsPressded(true)}
      onPressOut={() => setIsPressded(false)}
      onPress={onPress}
      android_ripple={{ color: "transparent" }}
    >
      <CustomIcon
        name={variant}
        className={cn(IconSizeVr({ size }), className)}
        color={color}
      />
    </Pressable>
  );
}

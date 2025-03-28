import { cssInterop } from "nativewind";
import { ICONS, TIcons } from "@/constants/ICONS";
import Svg, { Path, SvgProps } from "react-native-svg";

export type IconProps = {
  name: keyof TIcons;
  color?: string;
} & SvgProps;

cssInterop(Svg, {
  className: {
    target: "style",
  },
});

export default function CustomIcon({
  className,
  name,
  color = "#fff",
}: IconProps) {
  const viewBox = ICONS[name]?.viewBox;

  return (
    <Svg
      className={className || ""}
      focusable={false}
      viewBox={viewBox}
      color={color}
    >
      {ICONS[name]?.path.map((d, index) => (
        <Path key={index} d={d} fill={color} />
      ))}
    </Svg>
  );
}

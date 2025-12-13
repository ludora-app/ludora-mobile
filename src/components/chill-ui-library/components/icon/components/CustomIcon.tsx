import { cssInterop } from 'nativewind';
import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

import { ICONS } from '../../../constants';
import { useIconContext, type IconConfig, type IconStructure } from '../context/IconContext';

type CustomIconProps<T extends IconConfig = typeof ICONS> = {
  name: keyof T;
  color?: string;
  className?: string;
} & SvgProps;

/**
 * CustomIcon component that renders SVG icons with customizable styling.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <CustomIcon name="star" className="w-6 h-6 text-yellow-500" />
 *
 * // Without NativeWind (fallback)
 * <CustomIcon name="star" style={{ width: 24, height: 24 }} color="#F59E0B" />
 * ```
 */
const renderStructure = (structure: IconStructure, color?: string, index?: number): React.ReactNode => {
  const key = index ?? 0;

  switch (structure.type) {
    case 'g':
      return (
        <G key={key} {...structure.props}>
          {structure.children?.map((child, i) => renderStructure(child, color, i))}
        </G>
      );
    case 'path':
      return (
        <Path
          key={key}
          d={structure.d}
          {...(structure.fill && { fill: color ?? structure.fill })}
          {...(structure.stroke && { stroke: color ?? structure.stroke })}
          strokeWidth={structure.strokeWidth}
          strokeLinecap={structure.strokeLinecap as any}
          strokeLinejoin={structure.strokeLinejoin as any}
          opacity={structure.opacity}
          fillRule={structure.fillRule as any}
          clipRule={structure.clipRule as any}
        />
      );
    case 'defs':
      return <Defs key={key}>{structure.children?.map((child, i) => renderStructure(child, color, i))}</Defs>;
    case 'clipPath':
      return (
        <ClipPath key={key} {...structure.props}>
          {structure.children?.map((child, i) => renderStructure(child, color, i))}
        </ClipPath>
      );
    case 'rect':
      return <Rect key={key} {...structure.props} />;
    default:
      return null;
  }
};

export default function CustomIcon<T extends IconConfig = typeof ICONS>({
  className,
  color,
  name,
  style,
  ...props
}: CustomIconProps<T>) {
  const { icons } = useIconContext<T>();
  const iconData = icons?.[name as string] ?? ICONS[name as keyof typeof ICONS];
  const viewBox = iconData?.viewBox;
  const path = iconData?.path;
  const structure = iconData && 'structure' in iconData ? (iconData as any).structure : undefined;

  const svgLevelAttrs: any = {};
  if (iconData && 'fill' in iconData && iconData.fill) svgLevelAttrs.fill = iconData.fill;
  if (iconData && 'stroke' in iconData && iconData.stroke) svgLevelAttrs.stroke = iconData.stroke;
  if (iconData && 'strokeWidth' in iconData && iconData.strokeWidth) svgLevelAttrs.strokeWidth = iconData.strokeWidth;

  const svgProps = {
    className,
    color,
    focusable: false,
    style,
    viewBox,
    ...svgLevelAttrs,
    ...props,
  };

  if (structure) {
    return <Svg {...svgProps}>{renderStructure(structure, color)}</Svg>;
  }

  return (
    <Svg {...svgProps}>
      {path?.map((pathItem: any, index: number) => {
        // Handle both old format (string) and new format (object with attributes)
        const pathData = typeof pathItem === 'string' ? pathItem : pathItem.d;
        const pathAttrs = typeof pathItem === 'string' ? {} : pathItem;

        return (
          <Path
            key={index}
            d={pathData}
            {...(pathAttrs.fill && { fill: color || (pathAttrs.fill !== undefined && pathAttrs.fill) })}
            {...(pathAttrs.stroke && { stroke: color || (pathAttrs.stroke !== undefined && pathAttrs.stroke) })}
            strokeWidth={pathAttrs.strokeWidth}
            strokeLinecap={pathAttrs.strokeLinecap}
            strokeLinejoin={pathAttrs.strokeLinejoin}
            opacity={pathAttrs.opacity}
            fillRule={pathAttrs.fillRule}
            clipRule={pathAttrs.clipRule}
          />
        );
      })}
    </Svg>
  );
}

cssInterop(Svg, {
  className: {
    target: 'style',
  },
});

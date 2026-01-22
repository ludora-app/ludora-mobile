import { fontStyles, fontWeights } from '../components/outlinedString/styles/OutlinedString.styles';

export interface OutlinedStringProps {
  x?: number;
  y?: number;
  text: string;
  height?: number;
  opacity?: number;
  fontSize?: number;
  fillColor?: string;
  className?: string;
  shadowBlur?: number;
  fontFamily?: string; // Font family name. If not provided, uses platform-specific defaults with fallbacks
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  letterSpacing?: number;
  width?: number | 'auto';
  fontStyle?: keyof typeof fontStyles; // Font style ('normal', 'italic')
  textAnchor?: 'start' | 'middle' | 'end';
  fontWeight?: keyof typeof fontWeights | string; // Font weight (100-900, 'normal', 'bold', etc.)
  textDecoration?: 'none' | 'underline' | 'line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

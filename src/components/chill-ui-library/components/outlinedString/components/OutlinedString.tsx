import React, { memo } from 'react';
import { Platform } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

import { Box } from '../../box';
import { fontWeights } from '../styles/OutlinedString.styles';
import { OutlinedStringProps } from '../../../types/outlineString.types';

// Helper function to create font fallback chain
const createFontFallback = (fontFamily?: string): string => {
  // If user provides a font family, create a fallback chain
  const fallbacks = [];

  // Add the user's font family
  fallbacks.push(fontFamily);

  // Add platform-specific fallbacks
  if (Platform.OS === 'ios') {
    fallbacks.push('System', 'Helvetica Neue', 'Helvetica');
  } else if (Platform.OS === 'android') {
    fallbacks.push('Roboto', 'Noto Sans', 'sans-serif');
  } else {
    fallbacks.push('Arial', 'Helvetica', 'sans-serif');
  }

  return fallbacks.join(', ');
};

// Helper function to estimate text width with better accuracy
const estimateTextWidth = (
  text: string,
  fontSize: number,
  fontFamily?: string,
  fontWeight?: string,
  fontStyle?: string,
): number => {
  // More accurate estimation based on font characteristics
  let charWidth = 0.6; // Default character width ratio

  // Adjust based on font weight
  if (fontWeight) {
    const weight = parseInt(fontWeight, 10);
    if (weight >= 700) {
      charWidth = 0.65; // Bold fonts are wider
    } else if (weight <= 300) {
      charWidth = 0.55; // Light fonts are narrower
    }
  }

  // Adjust based on font style
  if (fontStyle === 'italic') {
    charWidth *= 1.05; // Italic fonts are slightly wider
  }

  // Adjust based on font family characteristics
  if (fontFamily) {
    const family = fontFamily.toLowerCase();
    if (family.includes('mono') || family.includes('courier')) {
      charWidth = 0.7; // Monospace fonts have consistent width
    } else if (family.includes('condensed') || family.includes('narrow')) {
      charWidth *= 0.85; // Condensed fonts are narrower
    } else if (family.includes('wide') || family.includes('extended')) {
      charWidth *= 1.15; // Wide fonts are broader
    }
  }

  // Calculate total width
  const baseWidth = text.length * fontSize * charWidth;

  // Add extra space for word spacing
  const wordCount = text.split(' ').length - 1;
  const wordSpacing = wordCount * fontSize * 0.1;

  return baseWidth + wordSpacing;
};

// Helper function to wrap text into lines
const wrapText = (
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily?: string,
  fontWeight?: string,
  fontStyle?: string,
): string[] => {
  const words = text.split(' ');

  const { currentLine, lines } = words.reduce<{ lines: string[]; currentLine: string }>(
    (acc, word) => {
      const testLine = acc.currentLine ? `${acc.currentLine} ${word}` : word;
      const testWidth = estimateTextWidth(testLine, fontSize, fontFamily, fontWeight, fontStyle);

      if (testWidth <= maxWidth) {
        return { ...acc, currentLine: testLine };
      }
      if (acc.currentLine) {
        return { currentLine: word, lines: [...acc.lines, acc.currentLine] };
      }
      // If a single word is too long, we have to break it
      return { currentLine: '', lines: [...acc.lines, word] };
    },
    { currentLine: '', lines: [] },
  );

  return currentLine ? [...lines, currentLine] : lines;
};

// Helper function to generate blur layers
const generateBlurLayers = (shadowBlur: number): { offsetX: number; offsetY: number; opacity: number }[] => {
  if (shadowBlur <= 0) return [];

  const layers: { offsetX: number; offsetY: number; opacity: number }[] = [];
  const maxLayers = Math.min(Math.floor(shadowBlur / 2), 8); // Limit to 8 layers for performance

  for (let i = 1; i <= maxLayers; i += 1) {
    const progress = i / maxLayers;
    const offset = (shadowBlur * progress) / 2;
    const opacity = (1 - progress) * 0.3; // Fade out as we go further

    // Create multiple offset positions around the main shadow
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    angles.forEach(angle => {
      const rad = (angle * Math.PI) / 180;
      layers.push({
        offsetX: Math.cos(rad) * offset,
        offsetY: Math.sin(rad) * offset,
        opacity: opacity / angles.length,
      });
    });
  }

  return layers;
};

export function SvgTextOutlined({
  fillColor = '#FFFFFF',
  fontFamily,
  fontSize = 16,
  fontStyle,
  fontWeight,
  height,
  letterSpacing,
  opacity = 1,
  shadowBlur = 0,
  shadowColor = '#000000',
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  shadowOpacity = 1,
  strokeColor = '#000000',
  strokeWidth = 1,
  text,
  textAnchor = 'start',
  textDecoration = 'none',
  textTransform = 'none',
  width,
  x,
  y,
}: OutlinedStringProps) {
  // Use font fallback chain for better reliability
  const finalFontFamily = React.useMemo(() => createFontFallback(fontFamily), [fontFamily]);

  // Process font weight
  const finalFontWeight = React.useMemo(
    () => (fontWeight ? fontWeights[fontWeight as keyof typeof fontWeights] || fontWeight : undefined),
    [fontWeight],
  );

  // Process font style
  const finalFontStyle = fontStyle || 'normal';

  // Apply text transformations
  const processedText = React.useMemo(() => {
    let result = text;
    switch (textTransform) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'capitalize':
        result = text.replace(/\b\w/g, char => char.toUpperCase());
        break;
      default:
        result = text;
    }
    return result;
  }, [text, textTransform]);

  // Wrap text into lines
  const lines = React.useMemo(
    () => wrapText(processedText, width, fontSize, finalFontFamily, finalFontWeight, finalFontStyle),
    [processedText, width, fontSize, finalFontFamily, finalFontWeight, finalFontStyle],
  );

  // Calculate total height needed for all lines
  const totalLineHeight = fontSize * 1.2;
  const totalHeight = lines.length * totalLineHeight;

  // Calculate center position if x and y are not provided
  const centerX = x ?? width / 2;
  const centerY = y ?? (height ? height / 2 : totalHeight / 2);

  // Calculate starting Y position to center all lines vertically
  // For SVG text, y represents the baseline, so we need to account for text that extends above it
  // Add a small offset to prevent text from being cut off at the top
  const startY = centerY - totalHeight / 2 + totalLineHeight / 2 + fontSize * 0.2;

  // Generate blur layers only when needed
  const blurLayers = React.useMemo(() => generateBlurLayers(shadowBlur), [shadowBlur]);

  return (
    <Box className="items-start justify-start" accessible accessibilityLabel={text}>
      <Svg height={Math.max(height ?? 0, totalHeight)} className="w-full">
        {lines.map((line, index) => {
          const lineY = startY + index * totalLineHeight;

          // Calculate the actual x position based on textAnchor
          const getTextX = () => {
            if (textAnchor === 'start') return 0;
            if (textAnchor === 'end') return width;
            return centerX;
          };
          const textX = getTextX();

          // Common text properties
          const commonTextProps = {
            fontFamily: finalFontFamily,
            fontSize,
            fontStyle: finalFontStyle,
            fontWeight: finalFontWeight,
            opacity,
            textAnchor,
            x: textX,
            y: lineY,
            ...(letterSpacing && { letterSpacing }),
          };

          // Handle text decoration separately due to TypeScript constraints
          const textDecorationProps =
            textDecoration === 'underline' || textDecoration === 'line-through' ? { textDecoration } : {};

          return (
            <React.Fragment key={index}>
              {/* Blur shadow layers */}
              {blurLayers.map((layer, layerIndex) => (
                <SvgText
                  key={`blur-${layerIndex}`}
                  {...commonTextProps}
                  {...textDecorationProps}
                  fill={shadowColor}
                  opacity={shadowOpacity * layer.opacity}
                  x={textX + shadowOffsetX + layer.offsetX}
                  y={lineY + shadowOffsetY + layer.offsetY}
                >
                  {line}
                </SvgText>
              ))}

              {/* Main shadow text - positioned with dynamic x and y offsets */}
              <SvgText
                {...commonTextProps}
                {...textDecorationProps}
                fill={shadowColor}
                opacity={shadowOpacity}
                x={textX + shadowOffsetX}
                y={lineY + shadowOffsetY}
              >
                {line}
              </SvgText>
              {/* Stroke text - creates the outline effect */}
              <SvgText
                {...commonTextProps}
                {...textDecorationProps}
                stroke={strokeColor}
                strokeWidth={strokeWidth * 2}
                fill="none"
              >
                {line}
              </SvgText>
              {/* Fill text - positioned on top */}
              <SvgText {...commonTextProps} {...textDecorationProps} fill={fillColor}>
                {line}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </Box>
  );
}

function OutlinedString(props: OutlinedStringProps) {
  return <SvgTextOutlined {...props} />;
}

export default memo(OutlinedString);

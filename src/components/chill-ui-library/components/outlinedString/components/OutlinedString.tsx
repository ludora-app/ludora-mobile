import React, { memo } from 'react';
import { withUniwind } from 'uniwind';
import { Platform } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { fontWeights } from '../styles/OutlinedString.styles';
import { OutlinedStringProps } from '../../../types/outlineString.types';

const StyledSvg = withUniwind(Svg);

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
  let charWidth = 0.52; // Default character width ratio - slightly increased to prevent clipping

  // Adjust based on font weight
  if (fontWeight) {
    const weight = parseInt(fontWeight, 10);
    if (weight >= 700) {
      charWidth = 0.57; // Bold fonts are wider
    } else if (weight <= 300) {
      charWidth = 0.47; // Light fonts are narrower
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
      charWidth = 0.6; // Monospace fonts have consistent width
    } else if (family.includes('condensed') || family.includes('narrow')) {
      charWidth *= 0.85; // Condensed fonts are narrower
    } else if (family.includes('wide') || family.includes('extended')) {
      charWidth *= 1.15; // Wide fonts are broader
    }
  }

  // Calculate total width
  const baseWidth = text.length * fontSize * charWidth;

  // Add extra space for word spacing - reduced for tighter fit
  const wordCount = text.split(' ').length - 1;
  const wordSpacing = wordCount * fontSize * 0.05;

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
  className,
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

  // Calculate actual width - if 'auto', calculate from text content
  const actualWidth = React.useMemo(() => {
    if (width === 'auto' || width === undefined) {
      // Calculate width based on the longest line
      const textLines = processedText.split('\n');
      const maxLineWidth = Math.max(
        ...textLines.map(line =>
          estimateTextWidth(line, fontSize, finalFontFamily, finalFontWeight, finalFontStyle),
        ),
      );
      return maxLineWidth;
    }
    return width;
  }, [width, processedText, fontSize, finalFontFamily, finalFontWeight, finalFontStyle]);

  // Wrap text into lines
  const lines = React.useMemo(
    () => wrapText(processedText, actualWidth, fontSize, finalFontFamily, finalFontWeight, finalFontStyle),
    [processedText, actualWidth, fontSize, finalFontFamily, finalFontWeight, finalFontStyle],
  );

  // Calculate total height needed for all lines
  const totalLineHeight = fontSize * 1.2;
  const totalHeight = lines.length * totalLineHeight;

  // Calculate center position if x and y are not provided
  const centerX = x ?? actualWidth / 2;
  const centerY = y ?? (height ? height / 2 : totalHeight / 2);

  // Calculate starting Y position to center all lines vertically
  // For SVG text, y represents the baseline, so we need to account for text that extends above it
  // Add a small offset to prevent text from being cut off at the top
  const startY = centerY - totalHeight / 2 + totalLineHeight / 2 + fontSize * 0.2;

  // Generate blur layers only when needed
  const blurLayers = React.useMemo(() => generateBlurLayers(shadowBlur), [shadowBlur]);

  // Calculate padding needed to prevent stroke from being cut off
  // The stroke can extend beyond the text bounds, especially on the left for 'start' anchor
  // We need to account for: strokeWidth (multiplied by 2), shadowOffsetX (can be negative), and shadowBlur
  const strokePaddingLeft = React.useMemo(() => {
    const maxStrokeExtent = strokeWidth * 2; // strokeWidth is multiplied by 2 in the component
    // For left padding, account for negative shadowOffsetX and shadowBlur
    const leftShadowExtent = Math.max(
      (shadowOffsetX < 0 ? Math.abs(shadowOffsetX) : 0) + (shadowBlur > 0 ? shadowBlur / 2 : 0),
      0
    );
    // Minimal padding - just enough to prevent clipping of stroke and characters that extend left (like J, P, etc.)
    return Math.ceil(maxStrokeExtent + leftShadowExtent);
  }, [strokeWidth, shadowOffsetX, shadowBlur]);

  // Small padding on the right for stroke and potential character overflow
  const strokePaddingRight = React.useMemo(() =>
    Math.ceil(strokeWidth * 2 + fontSize * 0.15) // Stroke + small buffer for character overflow
    , [strokeWidth, fontSize]);

  // SVG dimensions - padding on left and minimal on right
  const svgWidth = actualWidth + strokePaddingLeft + strokePaddingRight;
  const svgHeight = Math.max(height ?? 0, totalHeight);

  return (
    <Box
      className={cn("items-start justify-start", className)}
      accessible
      accessibilityLabel={text}
    >
      <StyledSvg
        height={svgHeight}
        width={svgWidth}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {lines.map((line, index) => {
          const lineY = startY + index * totalLineHeight;

          // Calculate the actual x position based on textAnchor
          // Text starts at strokePaddingLeft to prevent left clipping
          const getTextX = () => {
            if (textAnchor === 'start') return strokePaddingLeft;
            if (textAnchor === 'end') return actualWidth + strokePaddingLeft;
            return centerX + strokePaddingLeft;
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
                strokeLinejoin="round"
                strokeLinecap="round"
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
      </StyledSvg>
    </Box>
  );
}

function OutlinedString(props: OutlinedStringProps) {
  return <SvgTextOutlined {...props} />;
}

export default memo(OutlinedString);

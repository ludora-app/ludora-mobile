const path = require('path');
var fs = require('fs');
const jsdom = require('jsdom');

// Helper function to convert kebab-case to camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// Helper function to extract attributes from an element
function extractAttributes(element) {
  const attrs = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    const key = toCamelCase(attr.name);
    attrs[key] = attr.value;
  }
  return attrs;
}

// Helper function to recursively convert DOM elements to structure objects
function elementToStructure(element) {
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'path') {
    const pathObj = { type: 'path' };
    const attrs = extractAttributes(element);

    if (attrs.d) pathObj.d = attrs.d;
    if (attrs.fill) pathObj.fill = attrs.fill;
    if (attrs.stroke) pathObj.stroke = attrs.stroke;
    if (attrs.strokeWidth) pathObj.strokeWidth = attrs.strokeWidth;
    if (attrs.strokeLinecap) pathObj.strokeLinecap = attrs.strokeLinecap;
    if (attrs.strokeLinejoin) pathObj.strokeLinejoin = attrs.strokeLinejoin;
    if (attrs.opacity) pathObj.opacity = attrs.opacity;
    if (attrs.fillRule) pathObj.fillRule = attrs.fillRule;
    if (attrs.clipRule) pathObj.clipRule = attrs.clipRule;

    return pathObj;
  }

  if (tagName === 'g') {
    const gObj = { type: 'g' };
    const attrs = extractAttributes(element);

    // Store relevant attributes
    const relevantAttrs = {};
    if (attrs.clipPath) relevantAttrs.clipPath = attrs.clipPath;
    if (attrs.id) relevantAttrs.id = attrs.id;
    if (Object.keys(relevantAttrs).length > 0) {
      gObj.props = relevantAttrs;
    }

    const children = [];
    for (let i = 0; i < element.children.length; i++) {
      const child = elementToStructure(element.children[i]);
      if (child) children.push(child);
    }

    if (children.length > 0) gObj.children = children;
    return gObj;
  }

  if (tagName === 'defs') {
    const defsObj = { type: 'defs' };
    const children = [];

    for (let i = 0; i < element.children.length; i++) {
      const child = elementToStructure(element.children[i]);
      if (child) children.push(child);
    }

    if (children.length > 0) defsObj.children = children;
    return defsObj;
  }

  if (tagName === 'clippath') {
    const clipPathObj = { type: 'clipPath' };
    const attrs = extractAttributes(element);

    const relevantAttrs = {};
    if (attrs.id) relevantAttrs.id = attrs.id;
    if (Object.keys(relevantAttrs).length > 0) {
      clipPathObj.props = relevantAttrs;
    }

    const children = [];
    for (let i = 0; i < element.children.length; i++) {
      const child = elementToStructure(element.children[i]);
      if (child) children.push(child);
    }

    if (children.length > 0) clipPathObj.children = children;
    return clipPathObj;
  }

  if (tagName === 'rect') {
    const rectObj = { type: 'rect' };
    const attrs = extractAttributes(element);

    const relevantAttrs = {};
    if (attrs.width) relevantAttrs.width = parseInt(attrs.width) || attrs.width;
    if (attrs.height) relevantAttrs.height = parseInt(attrs.height) || attrs.height;
    if (attrs.fill) relevantAttrs.fill = attrs.fill;
    if (attrs.id) relevantAttrs.id = attrs.id;
    if (Object.keys(relevantAttrs).length > 0) {
      rectObj.props = relevantAttrs;
    }

    return rectObj;
  }

  return null;
}

// Helper function to check if SVG has complex structure (g, defs, etc.)
function hasComplexStructure(svg) {
  return (
    svg.querySelector('g') ||
    svg.querySelector('defs') ||
    svg.querySelector('clipPath') ||
    svg.querySelector('clippath')
  );
}

fs.readdir('./tools/svg-2-obj/svg', function (err, files) {
  const icons = {};
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filePath = path.join('./tools/svg-2-obj/svg', file);
    var fileName = file.split('.')[0];
    var fileExt = file.split('.')[1];

    if (fileExt === 'svg') {
      var buffer = fs.readFileSync(filePath);
      const fileContent = buffer.toString();

      var dom = new jsdom.JSDOM(fileContent);
      var svg = dom.window.document.querySelector('svg');
      var viewBox = svg.getAttribute('viewBox');

      // Extract SVG-level attributes
      var svgAttrs = {};
      var svgFill = svg.getAttribute('fill');
      var svgStroke = svg.getAttribute('stroke');
      var svgStrokeWidth = svg.getAttribute('stroke-width');

      if (svgFill) svgAttrs.fill = svgFill;
      if (svgStroke) svgAttrs.stroke = svgStroke;
      if (svgStrokeWidth) svgAttrs.strokeWidth = svgStrokeWidth;

      // Check if SVG has complex structure
      if (hasComplexStructure(svg)) {
        // Build structure from complex SVG
        const structure = { type: 'g', children: [] };

        for (let j = 0; j < svg.children.length; j++) {
          const child = elementToStructure(svg.children[j]);
          if (child) structure.children.push(child);
        }

        icons[fileName] = {
          viewBox: viewBox,
          structure: structure,
          ...svgAttrs,
        };
      } else {
        // Use simple path extraction for flat SVGs
        var paths = [];
        var pathsHTML = dom.window.document.querySelectorAll('path');

        pathsHTML.forEach(function (element) {
          var pathD = element.getAttribute('d');
          if (pathD && pathD !== '') {
            var pathObj = { d: pathD };

            // Extract all SVG attributes
            var stroke = element.getAttribute('stroke');
            var strokeWidth = element.getAttribute('stroke-width');
            var strokeLinecap = element.getAttribute('stroke-linecap');
            var strokeLinejoin = element.getAttribute('stroke-linejoin');
            var fill = element.getAttribute('fill');
            var opacity = element.getAttribute('opacity');
            var fillRule = element.getAttribute('fill-rule');
            var clipRule = element.getAttribute('clip-rule');

            if (stroke) pathObj.stroke = stroke;
            if (strokeWidth) pathObj.strokeWidth = strokeWidth;
            if (strokeLinecap) pathObj.strokeLinecap = strokeLinecap;
            if (strokeLinejoin) pathObj.strokeLinejoin = strokeLinejoin;
            if (fill) pathObj.fill = fill;
            if (opacity) pathObj.opacity = opacity;
            if (fillRule) pathObj.fillRule = fillRule;
            if (clipRule) pathObj.clipRule = clipRule;

            paths.push(pathObj);
          }
        });

        icons[fileName] = {
          viewBox: viewBox,
          path: paths,
          ...svgAttrs,
        };
      }
    }
  }

  var iconObj = JSON.stringify(icons, null, 2);

  // template for icons.tsx
  // export const ICONS: TIcon = iconObj as const

  fs.writeFileSync(
    './src/constants/ICONS.ts',
    `import type { TIconName as TIconNameChillUi } from '@chillui/ui';

export const ICONS = ${iconObj} as const;
export type TIcons = typeof ICONS;
export type TIconName = keyof TIcons;
export type TIconsAll = TIconName | TIconNameChillUi;
export const ICONS_OPTIONS = Object.keys(ICONS) as (keyof TIcons)[];
    `,
  );
});

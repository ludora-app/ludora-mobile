---
name: ludora-icons
description: Use whenever a screen, component or mockup needs an icon in the Ludora mobile app, especially one that is not yet in `tools/svg-2-obj/svg` / `icons.constants.ts`. Icons always come from the Iconsax MCP (never hand-drawn SVG, never Phosphor, unpkg or another library); defines the style-to-suffix mapping, the SVG file format, how to map mockup (Phosphor) names to Iconsax, and regenerating with `bun generate:icons`.
---

# Ludora icons

Every icon in the app comes from **Iconsax**. Fetch it through the Iconsax MCP (`mcp__iconsax__*`). Never write an SVG path yourself, and never take an icon from Phosphor, unpkg, Iconify or any other library, even when the mockup names a Phosphor icon.

You don't need to ask before adding an icon or running `bun generate:icons`: do it, then say which Iconsax icon you used.

## 1. Check what exists first

```bash
ls tools/svg-2-obj/svg | grep -iE '<keyword>'
```

The file name is the icon name: `tools/svg-2-obj/svg/calendar-regular.svg` → `<Icon name="calendar-regular" />`. Reuse an existing icon when it fits.

## 2. Find the Iconsax icon

- `mcp__iconsax__search_icons` (free set) first, then `mcp__iconsax__search_pro_icons` (Pro set) if nothing fits. Search with English keywords, and try synonyms.
- `mcp__iconsax__get_icon` / `mcp__iconsax__get_pro_icon` with `style` to get the SVG.
- Mockups (Claude Design) use **Phosphor** names. Map them to the closest Iconsax shape:

| Mockup (Phosphor) | Iconsax |
|---|---|
| `envelope-simple` | `sms` |
| `chat-circle-text` | `message-text` |
| `export` (iOS share) | `export-arrow-01` |
| `whatsapp-logo` | `whatsapp` |
| `link` | `link` |

If Iconsax has nothing close, say so and use an existing icon as a placeholder. Never draw one.

## 3. Style → file suffix

| Iconsax style | File suffix | Use |
|---|---|---|
| `linear` | `-regular.svg` | outlined icons (default) |
| `bold` | `-solid.svg` | filled icons |

Don't use the `broken`, `bulk`, `twotone` or `outline` styles: `outline` is a filled shape, not a stroke, and `bulk`/`twotone` rely on opacity layers.

## 4. File format

Write the file to `tools/svg-2-obj/svg/<name>-<regular|solid>.svg`. Keep the Iconsax paths **exactly** as returned, and normalize the rest:

- root: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">`;
- colors in `#ffffff` (`stroke="#ffffff"` for linear, `fill="#ffffff"` for bold). `CustomIcon` replaces every `fill`/`stroke` with the `color` prop, so the value only matters as the default;
- keep `stroke-width="1.5"`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`;
- drop the `<g clip-path>` wrapper and its `<defs><clipPath>` when the clip is the full 24×24 rect (it clips nothing);
- one element per line.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
<path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

Name the file after what it means in the app (`email-regular`, `export-regular`), not necessarily after the Iconsax name (`sms`, `export-arrow-01`). Check that the name isn't taken.

## 5. Generate and use

```bash
bun generate:icons
grep -c '"<name>-regular"' src/constants/icons.constants.ts   # 1
```

- `src/constants/icons.constants.ts` is generated: never edit it by hand.
- Use `<Icon name="<name>-regular" />` / `IconButton iconName=…`; type icon-name props as `TIconsAll`.
- Run `bun ts:check`, then swap any placeholder you used and remove its TODO.

## Known non-Iconsax icons

Some older icons come from other libraries (for example `link-regular.svg` is Phosphor, viewBox 256). When you touch a screen that uses one next to Iconsax icons, suggest replacing it with its Iconsax equivalent.

import { Href } from "expo-router";

export type TabRouteNames = "index" | "welcome" | "other";

interface TabRoutes {
  href: Href;
  name: TabRouteNames;
  iconName: string;
  iconNameActive: string;
  iconSize: number;
  text: string;
}

export const TAB_ROUTES: TabRoutes[] = [
  {
    href: "/(root)/(tabs)",
    iconName: "tab-bar-home",
    iconNameActive: "tab-bar-home-active",
    iconSize: 24,
    name: "index",
    text: "Home",
  },
  {
    href: "/(root)/(tabs)/welcome",
    iconName: "tab-bar-welcome",
    iconNameActive: "tab-bar-welcome-active",
    iconSize: 22,
    name: "welcome",
    text: "welcome",
  },
  {
    href: "/(root)/(tabs)/other",
    iconName: "tab-bar-other",
    iconNameActive: "tab-bar-other-active",
    iconSize: 24,
    name: "other",
    text: "other",
  },
];

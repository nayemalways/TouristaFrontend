import type { ISidebarItem } from "@/types/auth.types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) => section.items.map(route => ({
    path: route.url,
    Component: route.component
  })));
};
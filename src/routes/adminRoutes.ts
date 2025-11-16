import { lazy } from "react";

import type { ISidebarItem } from "@/types/auth.types";
const AddTourType  = lazy(() => import("@/pages/admin/AddTourType"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AddTour = lazy(() => import("@/pages/admin/AddTour"));


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour Type",
        url: "add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Tour",
        url: "add-tour",
        component: AddTour,
      },
    ],
  },
];
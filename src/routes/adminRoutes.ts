import { lazy } from "react";

import type { ISidebarItem } from "@/types/auth.types";
import AddDivision from "@/pages/admin/AddDivision";
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
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
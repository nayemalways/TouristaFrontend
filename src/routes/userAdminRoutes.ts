import Booking from "@/pages/user/Booking";
import type { ISidebarItem } from "@/types/auth.types";


export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Booking,
      },
    ]
  }
];
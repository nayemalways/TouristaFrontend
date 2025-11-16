import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminRoutes";
import { userSidebarItems } from "@/routes/userAdminRoutes";
import type { IUserRole } from "@/types/role.types";


export const getSidebarItems = (userRole: IUserRole) => {
    switch (userRole) {
        case role.superadmin:
            return [...adminSidebarItems]
        case role.admin:
            return [...adminSidebarItems]
        case role.user: 
            return [...userSidebarItems];
        default: 
            return [];
    }
}
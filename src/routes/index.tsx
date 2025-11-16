import App from "@/App";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminRoutes";
import { userSidebarItems } from "./userAdminRoutes";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";

const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children: [
            {
                path: 'about',
                Component: About
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.superadmin),
        path: '/admin',
        children: [{index: true, element: <Navigate to={'/admin/analytics'}/>} ,...generateRoutes(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, role.user),
        path: '/user',
        children: [ {index: true, element: <Navigate to={'/user/bookings'}/>} ,...generateRoutes(userSidebarItems)]
    },
    {
        Component: Login,
        path: '/login'
    },
    {
        Component: Signup,
        path: '/register'
    },
    {
        Component: Verify,
        path: '/verify'
    },
    {
        Component: Unauthorized,
        path: '/unauthorized'
    }
]);

export default router;
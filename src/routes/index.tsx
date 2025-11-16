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
        Component: DashboardLayout,
        path: '/admin',
        children: [{index: true, element: <Navigate to={'/admin/analytics'}/>} ,...generateRoutes(adminSidebarItems)]
    },
    {
        Component: DashboardLayout,
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
    }
]);

export default router;
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
import Home from "@/pages/Home";
import TourDetails from "@/pages/TourDetails";
import Checkout from "@/pages/Tour/Checkout";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentFailed from "@/pages/payment/PaymentFailed";
import PaymentCancel from "@/pages/payment/PaymentCancel";

const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: `tour/:tourId`,
                Component: TourDetails
            },
            {
                path: `tour/checkout`,
                Component: Checkout
            },
            {
                path: `payment_success`,
                Component: PaymentSuccess
            },
            {
                path: `payment_fail`,
                Component: PaymentFailed
            },
            {
                path: `payment_cancelled`,
                Component: PaymentCancel
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, [role.superadmin]),
        path: '/admin',
        children: [{index: true, element: <Navigate to={'/admin/analytics'}/>}, ...generateRoutes(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, [role.user]),
        path: '/user',
        children: [ {index: true, element: <Navigate to={'/user/bookings'}/>}, ...generateRoutes(userSidebarItems)]
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
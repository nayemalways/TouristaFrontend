import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
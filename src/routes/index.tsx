import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
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
        path: '/signup'
    }
]);

export default router;
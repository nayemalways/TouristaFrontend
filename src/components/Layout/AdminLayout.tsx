import { Outlet } from "react-router";

 

const AdminLayout = () => {
    return (
        <div>
            This is Admin Layout Componets
            <Outlet/>
        </div>
    );
};

export default AdminLayout;
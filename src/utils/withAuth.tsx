import { Spinner } from "@/components/ui/spinner";
import { useGetMeQuery } from "@/redux/features/auth/auth.api"
import type { IUserRole } from "@/types/role.types"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (
  Component: ComponentType,
  allowedRoles?: IUserRole[]
) => {
  return () => {
    const { data, isLoading } = useGetMeQuery(undefined);

     if (isLoading) {
      return <div className="w-full h-screen flex justify-center items-center ">
        <Spinner />
      </div>; // or a spinner/skeleton
    }

    const user = data?.data;

    if (!isLoading && !user?.email) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};

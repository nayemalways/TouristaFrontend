import { useGetMeQuery } from "@/redux/features/auth/auth.api"
import type { IUserRole } from "@/types/role.types"
import type { ComponentType } from "react"
import { Navigate } from "react-router"


export const withAuth = (Component: ComponentType, requireRole: IUserRole) => {
    return   () => {
        const {data, isLoading} = useGetMeQuery(undefined);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login"/>
        }

        if (requireRole && !isLoading && requireRole !== data?.data?.role) {
            return <Navigate to='/unauthorized'/>
        }

        return <Component />
    }
}
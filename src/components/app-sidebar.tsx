import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { getSidebarItems } from "@/utils/getUserRole"
import { useGetMeQuery } from "@/redux/features/auth/auth.api"

 

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // User info
  const {data: userData} = useGetMeQuery(undefined);
 
  // Role based Dashboard Rendering
  const data = getSidebarItems(userData?.data?.role);

 
  return (
    <Sidebar {...props}>
      <SidebarHeader className="w-36 py-3 md:w-46 md:py-5">
        <Link to={'/'}>
          <Logo/>
         </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

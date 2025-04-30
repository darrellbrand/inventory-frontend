
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Navbar from "./Navbar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "notes",
        url: "/inventory",
        icon: Inbox,
    },
    {
        title: "chat",
        url: "/chat",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <div className="fixed z-30">
            <Sidebar collapsible="icon" className="">
                <SidebarContent className="pt-5 ">
                    <SidebarGroup>
                        <SidebarGroupLabel>RTFM (Read This Fine Manual)</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            <SidebarTrigger className="z-30"></SidebarTrigger>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}

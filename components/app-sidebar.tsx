
import { Home, StickyNote, MessageCircleCode, FileUp, Contact} from "lucide-react"
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
        icon: StickyNote,
    },
    {
        title: "add note",
        url: "/addNote/-1",
        icon: FileUp,
    },
    {
        title: "chat",
        url: "/chat",
        icon: MessageCircleCode,
    },
    {
        title: "about",
        url: "https://darrellbrand.github.io/profile-site-single/",
        icon: Contact,
    },
]

export function AppSidebar() {
    return (
        <div className="fixed z-30 flex  justify-center h-full">
            <Sidebar collapsible="icon" className=""   >
                <SidebarContent className="pt-5 ">
                    <SidebarGroup>
                        <SidebarGroupLabel>RTFM (Read This Fun Manual)</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarTrigger className="z-30"></SidebarTrigger>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            {item.url.startsWith("http") ? (
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            ) : (
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            )}
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

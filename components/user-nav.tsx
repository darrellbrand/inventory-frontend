import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signIn } from "next-auth/react"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
export function UserNav() {
    const { data: session } = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage  src={session?.user?.image ? session.user.image : 'https://cdn.pixabay.com/photo/2021/11/06/05/26/signage-6772471_640.png'}>
                    </AvatarImage>
                    <AvatarFallback>
                        AS
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{session?.user?.name}</p>
                        <p className="text-sm font-medium leading-none">{session?.user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                {session ?
                    (<DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>)
                    :
                    (<DropdownMenuItem onClick={() => signIn('google')}>Sign In</DropdownMenuItem>)
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
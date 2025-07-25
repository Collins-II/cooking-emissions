"use client"

import { usePathname, useRouter } from "next/navigation"
import { type Icon } from "@tabler/icons-react"
//import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (url: string) => {
    router.push(url)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/*<SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-white text-white-foreground hover:bg-black/90 hover:text-white active:bg-black/90 min-w-8"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>

            <Button
              size="icon"
              className="relative size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
              <p className="absolute top-0 right-0 rounded-full flex justify-center items-center text-slate-600 text-[10px] px-1">3</p>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu> */}

        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title} onClick={() => handleClick(item.url)}>
                <SidebarMenuButton
                  tooltip={item.title}
                 className={`${
                    isActive
                      ? "bg-white text-blue-900 font-semibold"
                      : "hover:bg-white hover:text-blue-900 text-white"
                  } transition-colors duration-200 flex items-center gap-2 `}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

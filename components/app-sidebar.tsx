"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  //IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  //IconFileWord,
  IconFolder,
  //IconHelp,
 // IconInnerShadowTop,
  IconListDetails,
  IconReport,
  //IconSearch,
  IconSettings,
  //IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const data = {
  user: {
    name: "Collins",
    email: "collinsmambwe@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    /*{
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },*/
    {
      title: "Emissions Summary",
      url: "/emissions-summary",
      icon: IconListDetails,
    },
    {
      title: "Weekly Credits",
      url: "/weekly-credits",
      icon: IconChartBar,
    },
    {
      title: "Tips Sections",
      url: "/climate-tips",
      icon: IconFolder,
    },
    /*{
      title: "Team",
      url: "#",
      icon: IconUsers,
    },*/
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    /*{
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },*/
  ],
  documents: [
    {
      name: "Global Climate Data",
      url: "/global-climate",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: IconReport,
    },
    /*{
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },*/
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex gap-2 items-center">
                <div className="relative w-7 h-7 py-1">
                  <Image
                    src="/images/carbon-logo.jpg"
                    alt="Logo"
                    fill
                    className="rounded-full object-cover shadow-md shadow-white"
                    sizes="20px"
                  />
                </div>
                <span className="text-white text-xl font-light">Carbon Yanga.</span>
              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

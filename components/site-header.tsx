import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-green-800 text-xl font-medium">Cooking Emissions Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex rounded-full">
            <div className="relative w-8 h-8">
                <Image
                  src="/images/users/userk2.jpg"
                  alt="Logo"
                  fill
                  className="rounded-full object-cover"
                  sizes="20px"
                />
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}

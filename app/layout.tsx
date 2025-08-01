import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
//import Header3 from "@/components/Header3";

/*const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cooking Emissions Calculator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {/* <Header3 />*/}
        <SidebarProvider
             style={
               {
                 "--sidebar-width": "calc(var(--spacing) * 72)",
                 "--header-height": "calc(var(--spacing) * 12)",
               } as React.CSSProperties
             }
           >
             <AppSidebar variant="inset" />
             <SidebarInset>
              <SiteHeader />
                 {children}
               </SidebarInset>
         </SidebarProvider>
      </body>
    </html>
  );
}

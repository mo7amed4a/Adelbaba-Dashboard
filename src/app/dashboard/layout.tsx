import { AppSidebar } from "@/components/layouts/app-sidebar"
import Header from "@/components/layouts/header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-50">
        <Header />
        <div className="px-4 bg-[#F4F5F9]">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
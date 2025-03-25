import { AppSidebar } from "@/components/layouts/app-sidebar"
import Header from "@/components/layouts/header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/auth/sign-in`);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster />
      <main className="w-full bg-gray-50">
        <Header />
        <div className="px-4 bg-[#F4F5F9]">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
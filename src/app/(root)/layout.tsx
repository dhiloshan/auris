import SideBar from "@/components/Sidebar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex flex-1 h-full">
        <SideBar />
        <main className="flex-1">
          {children}
        </main>
    </div> 
  )
}

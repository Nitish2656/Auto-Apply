import Link from "next/link";
import { Search, Bell, Settings, FileText, Briefcase, Mail, Home, Cpu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0 z-10">
        
        {/* Workspace Brand */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-200 gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
             <Cpu className="w-5 h-5 text-brand-primary" />
          </div>
          <span className="font-heading font-black text-lg tracking-tight text-neutral-900 truncate">ApplyAgent</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 px-3">Menu</div>
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className="px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-semibold bg-brand-primary/10 text-brand-primary transition-colors">
              <Home className="w-4 h-4" />
              Overview
            </Link>
            
            <Link href="#jobs" className="px-3 py-2.5 rounded-lg flex items-center justify-between text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors group">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
                <span>Job Matches</span>
              </div>
              <div className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full font-bold group-hover:bg-white">
                44
              </div>
            </Link>

            <Link href="#applications" className="px-3 py-2.5 rounded-lg flex items-center justify-between text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
                <span>Applications</span>
              </div>
              <div className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                2 Pending
              </div>
            </Link>

            <Link href="#resumes" className="px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors group">
              <FileText className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
              Resumes
            </Link>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="p-4 border-t border-neutral-200 mt-auto">
          <Link href="#settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
            <Settings className="w-4 h-4 text-neutral-400" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-0 relative">
          
          <div className="flex items-center gap-4 flex-1">
             <div className="relative max-w-md w-full hidden sm:block">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search jobs, companies, or applications..." 
                  className="w-full bg-neutral-100 border-transparent rounded-lg text-sm px-9 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all placeholder:text-neutral-400 font-medium"
                />
              </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-sm font-bold text-brand-primary cursor-pointer hover:bg-brand-primary/20 transition-colors">
              N
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#FAFAFA] p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}

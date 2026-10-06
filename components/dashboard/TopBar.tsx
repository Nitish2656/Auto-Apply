import { Search, Bell } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0 z-10 relative shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search jobs, companies, or applications..."
            className="w-full bg-neutral-100 border border-transparent rounded-lg text-sm px-9 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all placeholder:text-neutral-400 font-medium"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>
        <button className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-sm font-bold text-brand-primary cursor-pointer hover:bg-brand-primary/20 transition-colors" aria-label="User menu">
          N
        </button>
      </div>
    </header>
  );
}

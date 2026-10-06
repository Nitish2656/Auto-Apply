import Link from "next/link";
import { Settings, FileText, Briefcase, Mail, Home, Cpu } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: Home, badge: null },
  { href: "/dashboard/jobs", label: "Job Matches", icon: Briefcase, badge: { label: "44", variant: "neutral" as const } },
  { href: "/dashboard/applications", label: "Applications", icon: Mail, badge: { label: "2 Pending", variant: "warning" as const } },
  { href: "/dashboard/resumes", label: "Resumes", icon: FileText, badge: null },
];

const badgeVariants = {
  neutral: "bg-neutral-100 text-neutral-600",
  warning: "bg-orange-100 text-orange-600",
};

interface SidebarProps {
  activePath?: string;
}

export function Sidebar({ activePath = "/dashboard" }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0 h-full">
      
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 gap-3 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
          <Cpu className="w-5 h-5 text-brand-primary" />
        </div>
        <span className="font-heading font-black text-lg tracking-tight text-neutral-900 truncate">
          ApplyAgent
        </span>
      </div>

      {/* Navigation — scrollable if nav grows */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-3">Menu</p>
        {navLinks.map(({ href, label, icon: Icon, badge }) => {
          const isActive = activePath === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2.5 rounded-lg flex items-center justify-between text-sm font-semibold transition-colors group ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-primary" : "text-neutral-400 group-hover:text-neutral-600"}`} />
                {label}
              </span>
              {badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeVariants[badge.variant]}`}>
                  {badge.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 shrink-0">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <Settings className="w-4 h-4 text-neutral-400" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

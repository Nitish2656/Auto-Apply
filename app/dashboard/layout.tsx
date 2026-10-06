import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * ARCHITECTURE:
     * Root = h-screen + overflow-hidden → locks entire viewport, nothing escapes.
     * Sidebar = h-full → fills the locked height, never scrolls with content.
     * Right col = flex-col + min-h-0 → allows inner flex children to scroll.
     * TopBar = shrink-0 → always visible, never pushed off-screen.
     * <main> = flex-1 + overflow-y-auto → ONLY this area scrolls.
     */
    <div className="h-screen overflow-hidden bg-[#FAFAFA] flex font-sans">
      
      {/* Sidebar — fixed height, never scrolls */}
      <Sidebar />

      {/* Right column: TopBar + scrollable content */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}

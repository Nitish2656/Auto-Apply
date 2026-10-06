import { 
  Briefcase, 
  Target, 
  Clock, 
  Send,
  PlayCircle,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { getStats, getPendingDrafts } from "@/lib/db";

// Prevent Next.js from caching this page so it's always live
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const stats = getStats();
  const drafts = getPendingDrafts();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Overview</h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">Here is what your ApplyAgent has been up to today.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5">
          <PlayCircle className="w-4 h-4" />
          Run Pipeline
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-neutral-600">Jobs Scanned</span>
          </div>
          <div>
            <div className="text-3xl font-black text-neutral-900">{stats.jobsScanned}</div>
            <div className="text-xs text-neutral-500 font-medium mt-1">Total in database</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-neutral-600">Matches Found</span>
          </div>
          <div>
            <div className="text-3xl font-black text-neutral-900">{stats.matchesFound}</div>
            <div className="text-xs text-neutral-500 font-medium mt-1">Score &gt; 40</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-primary shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-brand-primary" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-neutral-600">Pending Review</span>
          </div>
          <div>
            <div className="text-3xl font-black text-neutral-900">{stats.pendingReview}</div>
            <div className="text-xs text-brand-primary font-bold mt-1">Action required</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-neutral-600">Emails Sent</span>
          </div>
          <div>
            <div className="text-3xl font-black text-neutral-900">{stats.emailsSent}</div>
            <div className="text-xs text-neutral-500 font-medium mt-1">Daily cap: 15</div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-neutral-900">Action Required: Review Drafts</h2>
            <button className="text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors">
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm divide-y divide-neutral-100 overflow-hidden">
            
            {drafts.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-neutral-300" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">All caught up!</h3>
                <p className="text-sm text-neutral-500 mt-1">No drafts waiting for your review.</p>
              </div>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="p-5 hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Draft</span>
                        <span className="text-xs text-neutral-400 font-bold">Match Score: {draft.score}</span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-900">{draft.company}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{draft.title}</p>
                      <p className="text-xs text-neutral-400 mt-2">To: {draft.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 font-bold text-sm rounded-lg transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Send
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Pipeline Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-neutral-900">Pipeline Status</h2>
          
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm relative">
            <div className="absolute left-[29px] top-8 bottom-8 w-px bg-neutral-200" />

            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-5 h-5 rounded-full bg-brand-primary ring-4 ring-white flex items-center justify-center shrink-0 mt-0.5 z-10">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Fetch Jobs</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Scraped {stats.jobsScanned} jobs from feeds.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-5 h-5 rounded-full bg-brand-primary ring-4 ring-white flex items-center justify-center shrink-0 mt-0.5 z-10">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Score & Filter</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Identified {stats.matchesFound} matches.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-5 h-5 rounded-full bg-brand-primary ring-4 ring-white flex items-center justify-center shrink-0 mt-0.5 z-10">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Find Contacts</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Found {drafts.length} verified recruiter emails.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 relative">
                <div className={`w-5 h-5 rounded-full ring-4 ring-white flex items-center justify-center shrink-0 mt-0.5 z-10 ${drafts.length > 0 ? 'bg-orange-100 border-2 border-orange-500' : 'bg-brand-primary'}`}>
                  {drafts.length > 0 ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Review Drafts</h4>
                  <p className={`text-xs mt-0.5 ${drafts.length > 0 ? 'text-orange-600 font-bold' : 'text-neutral-500'}`}>
                    {drafts.length > 0 ? `Waiting for your approval (${drafts.length} drafts).` : 'All drafts reviewed.'}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4 relative">
                <div className="w-5 h-5 rounded-full bg-neutral-100 border-2 border-neutral-300 ring-4 ring-white shrink-0 mt-0.5 z-10" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-400">Send Applications</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Pending approval step.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

import { CheckCircle2, Target, Send, XCircle } from "lucide-react";
import { ApplicationDraft } from "@/lib/db";
import { SubmitButton } from "./SubmitButton";

interface DraftCardProps {
  draft: ApplicationDraft;
}

export function DraftCard({ draft }: DraftCardProps) {
  // Helper to format source nicely
  const getSourceLabel = (src: string) => {
    switch(src) {
      case 'hn': return 'HackerNews';
      case 'remoteok': return 'RemoteOK';
      case 'remotive': return 'Remotive';
      case 'linkedin': return 'LinkedIn';
      default: return src;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-all flex flex-col gap-5">
      
      {/* Header: Company + Meta */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-xl shrink-0 border border-brand-primary/20">
            {draft.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-black text-neutral-900 text-base">{draft.company}</h3>
            <p className="text-xs font-bold text-neutral-500 mt-0.5">
              {draft.location || 'Remote'} <span className="mx-1 text-neutral-300">•</span> 
              {getSourceLabel(draft.source)}
            </p>
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-wider border border-green-100/50">
            <Target className="w-3.5 h-3.5"/> Match: {draft.score}
          </span>
          <span className="text-[11px] font-bold text-neutral-400">
            {draft.posted_at?.substring(0, 10) || 'Recent'}
          </span>
        </div>
      </div>

      {/* Body: Title & Desc */}
      <div>
        <h4 className="text-lg font-black text-neutral-900 mb-2 leading-tight">{draft.title}</h4>
        <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
          {draft.description}
        </p>
        <a href={draft.url} target="_blank" rel="noreferrer" className="text-xs text-brand-primary font-bold mt-2 inline-flex items-center gap-1 hover:text-brand-primary/80 transition-colors">
          Read full job post ↗
        </a>
      </div>

      {/* Footer: Email & Actions */}
      <div className="pt-4 border-t border-neutral-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Email Draft Wrapper - Added whitespace-nowrap and truncate to fix wrapping bug */}
        <div className="text-sm bg-neutral-50 px-4 py-2 rounded-xl border border-neutral-200/60 flex items-center gap-2 text-neutral-600 max-w-full overflow-hidden">
          <Send className="w-4 h-4 text-neutral-400 shrink-0" />
          <span className="whitespace-nowrap shrink-0">Draft to:</span> 
          <span className="font-bold text-neutral-900 truncate" title={draft.email}>{draft.email}</span>
        </div>
        
        {/* Action Buttons via Server Actions */}
        <div className="flex items-center gap-2 w-full lg:w-auto shrink-0">
          <form action={async () => {
            "use server";
            const { rejectDraft } = await import("@/app/actions");
            await rejectDraft(draft.id);
          }} className="flex-1 lg:flex-none">
            <SubmitButton 
              className="w-full px-4 py-2.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 font-bold text-sm rounded-xl transition-colors text-center border border-transparent hover:border-red-100"
              loadingText="Wait..."
            >
              Reject
            </SubmitButton>
          </form>
          
          <form action={async () => {
            "use server";
            const { approveDraft } = await import("@/app/actions");
            await approveDraft(draft.id);
          }} className="flex-1 lg:flex-none">
            <SubmitButton 
              className="w-full px-6 py-2.5 bg-neutral-900 text-white hover:bg-brand-primary font-bold text-sm rounded-xl transition-colors shadow-sm shadow-neutral-900/10 text-center"
              loadingText="Approving..."
            >
              Approve & Send
            </SubmitButton>
          </form>
        </div>
      </div>
      
    </div>
  );
}

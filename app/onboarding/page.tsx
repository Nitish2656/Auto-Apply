"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Loader2, MonitorPlay, Smartphone } from "lucide-react";

const CATEGORIES = [
  { id: "kids_stories", name: "Kids Stories", color: "bg-[#FF8FA3]", desc: "Educational and entertaining tales for children." },
  { id: "travel", name: "Travel", color: "bg-[#3FA9A0]", desc: "Breathtaking locations and travel tips." },
  { id: "dance", name: "Dance", color: "bg-[#C64FD1]", desc: "Trending choreography and music." },
  { id: "cooking", name: "Cooking", color: "bg-[#FF9F45]", desc: "Quick recipes and food hacks." },
  { id: "anime", name: "Anime Saga", color: "bg-[#7B6EF6]", desc: "Serialized original anime shorts." },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);
  const [connecting, setConnecting] = useState<"youtube" | "ig" | null>(null);
  const [launching, setLaunching] = useState(false);

  const handleCategorySelect = (catId: string, catName: string) => {
    setCategory(catId);
    setName(`My ${catName} Channel`);
    setStep(2);
  };

  const handleConnect = (platform: "youtube" | "ig") => {
    setConnecting(platform);
    setTimeout(() => {
      if (platform === "youtube") setYoutubeConnected(true);
      if (platform === "ig") setIgConnected(true);
      setConnecting(null);
    }, 1500);
  };

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans">
      <header className="h-16 border-b border-hairline flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-brand-amber rounded-sm rotate-12 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-bg-base rounded-sm" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">ContentLine</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-hairline -z-10" />
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono transition-colors ${
                step >= s ? "bg-brand-amber text-bg-base" : "bg-bg-panel border border-hairline text-text-dim"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>

          <div className="bg-bg-panel border border-hairline rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden min-h-[400px] flex flex-col">
            
            {/* Step 1: Category */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-bold font-heading text-text-high mb-2">Choose your niche</h1>
                <p className="text-text-mid mb-8">What kind of content will this line produce?</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id, cat.name)}
                      className="flex flex-col text-left p-4 border border-hairline bg-bg-base rounded-lg hover:border-brand-amber hover:bg-bg-raised transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span className="font-bold text-text-high">{cat.name}</span>
                      </div>
                      <span className="text-sm text-text-dim group-hover:text-text-mid transition-colors">
                        {cat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Name */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                <h1 className="text-2xl font-bold font-heading text-text-high mb-2">Name your Content Line</h1>
                <p className="text-text-mid mb-8">Give it a memorable name for your dashboard.</p>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-mid mb-2">Content Line Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg-base border border-hairline rounded-md px-4 py-3 text-text-high focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all"
                    autoFocus
                  />
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-hairline">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-text-dim hover:text-text-high transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    disabled={!name.trim()}
                    className="flex items-center gap-2 bg-text-high text-bg-base px-6 py-2.5 rounded font-medium hover:bg-text-high/90 transition-colors disabled:opacity-50"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Connect */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                <h1 className="text-2xl font-bold font-heading text-text-high mb-2">Connect Channels</h1>
                <p className="text-text-mid mb-8">Where should this content line publish to?</p>
                
                <div className="flex-1 space-y-4">
                  {/* YouTube */}
                  <div className="flex items-center justify-between p-4 border border-hairline bg-bg-base rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#FF0000]/10 flex items-center justify-center">
                        <MonitorPlay className="w-6 h-6 text-[#FF0000]" />
                      </div>
                      <div>
                        <div className="font-bold text-text-high">YouTube</div>
                        <div className="text-xs text-text-dim">{youtubeConnected ? "Connected: MyChannel" : "Required for video shorts"}</div>
                      </div>
                    </div>
                    {youtubeConnected ? (
                      <div className="flex items-center gap-2 text-signal-green text-sm font-medium">
                        <Check className="w-4 h-4" /> Connected
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnect("youtube")}
                        disabled={connecting !== null}
                        className="px-4 py-2 bg-bg-raised border border-hairline rounded text-sm font-medium hover:bg-hairline transition-colors w-28 flex justify-center"
                      >
                        {connecting === "youtube" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                      </button>
                    )}
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center justify-between p-4 border border-hairline bg-bg-base rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#E1306C]/10 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-[#E1306C]" />
                      </div>
                      <div>
                        <div className="font-bold text-text-high">Instagram</div>
                        <div className="text-xs text-text-dim">{igConnected ? "Connected: @mychannel" : "Optional (Reels only)"}</div>
                      </div>
                    </div>
                    {igConnected ? (
                      <div className="flex items-center gap-2 text-signal-green text-sm font-medium">
                        <Check className="w-4 h-4" /> Connected
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnect("ig")}
                        disabled={connecting !== null}
                        className="px-4 py-2 bg-bg-raised border border-hairline rounded text-sm font-medium hover:bg-hairline transition-colors w-28 flex justify-center"
                      >
                        {connecting === "ig" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-hairline">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-text-dim hover:text-text-high transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    disabled={!youtubeConnected && !igConnected}
                    className="flex items-center gap-2 bg-text-high text-bg-base px-6 py-2.5 rounded font-medium hover:bg-text-high/90 transition-colors disabled:opacity-50"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                <h1 className="text-2xl font-bold font-heading text-text-high mb-2">Ready to Launch</h1>
                <p className="text-text-mid mb-8">Review your setup before firing up the engines.</p>
                
                <div className="flex-1 space-y-6 bg-bg-base border border-hairline rounded-lg p-6">
                  <div>
                    <div className="text-xs font-mono text-text-dim uppercase mb-1">Content Line Name</div>
                    <div className="font-medium text-text-high">{name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-dim uppercase mb-1">Category</div>
                    <div className="font-medium text-text-high flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${CATEGORIES.find(c => c.id === category)?.color}`} />
                      {CATEGORIES.find(c => c.id === category)?.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-dim uppercase mb-1">Targets</div>
                    <div className="flex gap-2">
                      {youtubeConnected && <span className="px-2 py-1 bg-bg-raised text-xs rounded border border-hairline">YouTube Shorts</span>}
                      {igConnected && <span className="px-2 py-1 bg-bg-raised text-xs rounded border border-hairline">Instagram Reels</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-hairline">
                  <button onClick={() => setStep(3)} disabled={launching} className="flex items-center gap-2 text-text-dim hover:text-text-high transition-colors disabled:opacity-50">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={handleLaunch}
                    disabled={launching}
                    className="flex items-center gap-2 bg-brand-amber text-bg-base px-8 py-3 rounded font-bold hover:bg-brand-amber/90 transition-colors"
                  >
                    {launching ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Launching...</>
                    ) : (
                      <>Launch Content Line <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

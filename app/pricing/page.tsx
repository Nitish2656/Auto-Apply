import { Nav } from "@/components/marketing/Nav";
import { SmoothScroll } from "@/components/marketing/SmoothScroll";
import { Footer } from "@/components/marketing/Footer";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing | ContentLine",
  description: "Simple, predictable pricing for automated content creation.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans">
      <SmoothScroll />
      <Nav />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-high mb-6">
              Pricing that scales with you.
            </h1>
            <p className="text-lg text-text-mid">
              Pay for what you use. No hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-8 border border-hairline bg-bg-panel flex flex-col rounded-lg">
              <h3 className="text-xl font-bold font-heading text-text-high mb-2">Starter</h3>
              <p className="text-text-dim text-sm mb-6">For individuals exploring automation.</p>
              <div className="text-4xl font-bold font-mono text-text-high mb-8">Free</div>
              <Link href="/auth/signin" className="w-full text-center py-3 bg-bg-raised border border-hairline text-text-high font-medium rounded hover:bg-hairline transition-colors mb-8">
                Start for Free
              </Link>
              <ul className="flex-1 space-y-4 text-sm text-text-mid">
                <li className="flex gap-3"><Check className="w-5 h-5 text-signal-green shrink-0" /> 1 Content Line</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-signal-green shrink-0" /> 5 videos / month</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-signal-green shrink-0" /> Basic analytics</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-signal-green shrink-0" /> YouTube publishing only</li>
              </ul>
            </div>
            
            {/* Pro */}
            <div className="p-8 border border-brand-amber bg-bg-raised flex flex-col rounded-lg relative transform md:-translate-y-4 shadow-xl shadow-brand-amber/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-amber text-bg-base text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                Recommended
              </div>
              <h3 className="text-xl font-bold font-heading text-brand-amber mb-2">Pro</h3>
              <p className="text-text-mid text-sm mb-6">For creators scaling their output.</p>
              <div className="text-4xl font-bold font-mono text-text-high mb-8">$49<span className="text-lg text-text-dim font-sans font-normal">/mo</span></div>
              <Link href="/auth/signin" className="w-full text-center py-3 bg-brand-amber text-bg-base font-medium rounded hover:bg-opacity-90 transition-colors mb-8">
                Get Started
              </Link>
              <ul className="flex-1 space-y-4 text-sm text-text-high">
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> 5 Content Lines</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> 50 videos / month</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> Advanced analytics</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> YouTube + Instagram</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> Custom style config</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-brand-amber shrink-0" /> Priority processing</li>
              </ul>
            </div>

            {/* Scale */}
            <div className="p-8 border border-hairline bg-bg-panel flex flex-col rounded-lg">
              <h3 className="text-xl font-bold font-heading text-text-high mb-2">Scale</h3>
              <p className="text-text-dim text-sm mb-6">For agencies and media brands.</p>
              <div className="text-4xl font-bold font-mono text-text-high mb-8">$199<span className="text-lg text-text-dim font-sans font-normal">/mo</span></div>
              <Link href="/auth/signin" className="w-full text-center py-3 bg-bg-raised border border-hairline text-text-high font-medium rounded hover:bg-hairline transition-colors mb-8">
                Contact Sales
              </Link>
              <ul className="flex-1 space-y-4 text-sm text-text-mid">
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> 50 Content Lines</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> 500 videos / month</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> Full analytics suite</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> All platforms supported</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> BYOK (Bring Your Own Keys)</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-text-high shrink-0" /> API Access</li>
              </ul>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto mb-24 overflow-x-auto">
            <h3 className="text-2xl font-bold font-heading mb-8">Compare Features</h3>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="py-4 font-mono text-xs uppercase text-text-dim font-medium w-1/3">Feature</th>
                  <th className="py-4 font-mono text-xs uppercase text-text-dim font-medium">Starter</th>
                  <th className="py-4 font-mono text-xs uppercase text-brand-amber font-medium">Pro</th>
                  <th className="py-4 font-mono text-xs uppercase text-text-dim font-medium">Scale</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-hairline/50">
                  <td className="py-4 text-text-high">Content Lines</td>
                  <td className="py-4 text-text-mid">1</td>
                  <td className="py-4 text-text-high font-medium">5</td>
                  <td className="py-4 text-text-mid">50</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 text-text-high">Videos / Month</td>
                  <td className="py-4 text-text-mid">5</td>
                  <td className="py-4 text-text-high font-medium">50</td>
                  <td className="py-4 text-text-mid">500</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 text-text-high">Platforms</td>
                  <td className="py-4 text-text-mid">YouTube</td>
                  <td className="py-4 text-text-high font-medium">YouTube, Instagram</td>
                  <td className="py-4 text-text-mid">All + API</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 text-text-high">Human Review Gate</td>
                  <td className="py-4 text-text-mid"><Check className="w-4 h-4 text-text-dim" /></td>
                  <td className="py-4 text-text-high"><Check className="w-4 h-4 text-brand-amber" /></td>
                  <td className="py-4 text-text-mid"><Check className="w-4 h-4 text-text-dim" /></td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 text-text-high">BYOK API Keys</td>
                  <td className="py-4 text-text-dim">—</td>
                  <td className="py-4 text-text-dim">—</td>
                  <td className="py-4 text-text-mid"><Check className="w-4 h-4 text-text-dim" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold font-heading mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-text-high mb-2">What happens if I exceed my monthly video limit?</h4>
                <p className="text-text-mid text-sm">Your pipelines will pause until the next billing cycle. On the Pro and Scale plans, you can configure overage billing to automatically continue generating content at a flat per-video rate.</p>
              </div>
              <div>
                <h4 className="font-bold text-text-high mb-2">Can I bring my own API keys (BYOK)?</h4>
                <p className="text-text-mid text-sm">Yes, BYOK is available on the Scale plan. You can plug in your own Claude, ElevenLabs, Kling, or Veo keys and only pay our platform fee.</p>
              </div>
              <div>
                <h4 className="font-bold text-text-high mb-2">What platforms do you support?</h4>
                <p className="text-text-mid text-sm">Currently, we support automated publishing to YouTube Shorts and Instagram Reels. TikTok support is in beta for Scale customers.</p>
              </div>
              <div>
                <h4 className="font-bold text-text-high mb-2">How does the human-review step work for kids content?</h4>
                <p className="text-text-mid text-sm">Any Content Line can be configured to require a human approval step before publishing. The pipeline halts at "Awaiting Review" until you click Approve in the dashboard.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

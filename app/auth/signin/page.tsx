"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockRepo } from "@/lib/mock-data/repository";
import { WORKSPACE } from "@/lib/mock-data/db";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulate network and auth logic
    const lines = await mockRepo.getContentLines(WORKSPACE.id);
    
    if (lines.length > 0) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex font-sans selection:bg-brand-primary selection:text-white">
      
      {/* Left Auth Panel (White Theme) */}
      <div className="w-full lg:w-1/2 min-h-screen bg-white flex flex-col relative z-10">
        
        {/* Logo */}
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-8 h-8 bg-brand-primary rounded-lg rotate-12 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span className="font-black text-xl tracking-tighter text-black uppercase">ContentLine</span>
          </Link>
        </div>

        {/* Auth Form */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32">
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Welcome back</h1>
            <p className="text-neutral-500 text-sm mb-8">Sign in to your account to continue.</p>

            {/* OAuth Providers */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleSignIn()}
                className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 text-black font-medium px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
              >
                {/* Google Logo (Original Colors) */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button 
                onClick={() => handleSignIn()}
                className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 text-black font-medium px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
              >
                {/* GitHub Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-neutral-500">Or continue with</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Email address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder:text-neutral-400"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-black">Password</label>
                  <Link href="#" className="text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors">Forgot password?</Link>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder:text-neutral-400"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-black text-white font-medium px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors mt-2 shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
              </button>
            </form>
            
            <p className="text-center text-sm text-neutral-500 mt-8">
              Don't have an account? <Link href="#" className="font-medium text-black hover:underline underline-offset-4">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Brand Panel (Dark Theme) */}
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-center p-12 relative overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="relative z-10 max-w-md mx-auto">
          <h2 className="text-5xl xl:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            The studio <br />
            that <span className="text-neutral-600">runs itself.</span>
          </h2>
          <p className="text-neutral-400 text-lg font-medium leading-relaxed">
            Autonomous research, scripting, generation, and publishing. Welcome to the future of content creation.
          </p>
        </div>
      </div>

    </div>
  );
}

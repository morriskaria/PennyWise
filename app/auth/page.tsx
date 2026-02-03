'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - in production, this would call your auth API
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-stretch font-display">
      {/* Left Branding Section (Visible on Desktop) */}
      <div className="hidden lg:flex flex-col justify-between w-[40%] bg-slate-branding p-12 text-white relative overflow-hidden">
        {/* Background Pattern/Gradient for texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-20">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-branding font-bold">account_balance_wallet</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Pennywise</h1>
          </div>
          {/* Branding Hero Content */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Secure &amp; Compliant
            </div>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Empowering Kenyan SMEs with smart bookkeeping.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Audit-ready reporting for KRA compliance in one click. Join thousands of businesses scaling with confidence.
            </p>
            {/* Testimonial/Benefit Rotation Simulation */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <div className="flex gap-1 text-primary mb-3">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="text-slate-200 italic mb-4">"The VAT filing assistant saved me hours of manual work. Pennywise is a game-changer for local businesses."</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-500" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCY5aAkZXzxEeVMwyar_DXAbU4lt2Fjd5c2VLYkQgtrdRZJIZRYIyeDud-yC4wsOI1JQ0JUnBd7gJ5Xs2mWQLEwHc2WIlwtTBkHp9I3REnNk8JKGBKucUUC-wXkSjOaBTJgQJbfLKbKACj0qFYcAqOaUtaCCiJMvxlQSu2bHl4oqKW7z-d8un4kIGhyZQTDfcL2svDjhTjPhQ_pGfNrt-vHSG8JYtsIoG69c299nE5UHV7JElfsRBjwQunk57zjh9_iLA3GQlzE3n0)', backgroundSize: 'cover' }}></div>
                <div>
                  <p className="text-sm font-bold">Kamau Njoroge</p>
                  <p className="text-xs text-slate-400">CEO, TechFlow Nairobi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Left */}
        <div className="relative z-10 flex gap-6 text-slate-400 text-sm">
          <span>© 2024 Pennywise Ltd.</span>
          <a className="hover:text-white transition-colors" href="#">Privacy</a>
          <a className="hover:text-white transition-colors" href="#">Terms</a>
        </div>
      </div>
      {/* Right Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-[480px]">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white font-bold text-sm">account_balance_wallet</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Pennywise</h1>
          </div>
          {/* Form Header & Tabs */}
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-2xl font-black text-[#111816] dark:text-white mb-2">Get started for free</h3>
            <p className="text-slate-500 dark:text-slate-400">Manage your business finance in one secure place.</p>
          </div>
          {/* Tabs Component */}
          <div className="pb-6">
            <div className="flex border-b border-[#dbe6e2] dark:border-slate-700 gap-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 hover:text-primary transition-colors ${isLogin ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-500 dark:text-slate-400'}`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Login</p>
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${!isLogin ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-500 dark:text-slate-400'} hover:text-primary transition-colors`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Create Account</p>
              </button>
            </div>
          </div>
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <label className="flex flex-col">
                  <p className="text-[#111816] dark:text-slate-200 text-sm font-medium leading-normal pb-2">Full Name</p>
                  <input className="form-input w-full rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-sm" placeholder="e.g. Jane Doe" type="text" />
                </label>
                {/* Business Name */}
                <label className="flex flex-col">
                  <p className="text-[#111816] dark:text-slate-200 text-sm font-medium leading-normal pb-2">Business Name</p>
                  <input className="form-input w-full rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-sm" placeholder="Your SME Name" type="text" />
                </label>
              </div>
            )}
            {!isLogin && (
              /* KRA PIN (Optional) */
              <label className="flex flex-col">
                <div className="flex justify-between items-center pb-2">
                  <p className="text-[#111816] dark:text-slate-200 text-sm font-medium leading-normal">KRA PIN <span className="text-slate-400 font-normal">(Optional)</span></p>
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase">Recommended</span>
                </div>
                <input className="form-input w-full rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-sm" placeholder="A000000000Z" type="text" />
              </label>
            )}
            {/* Email */}
            <label className="flex flex-col">
              <p className="text-[#111816] dark:text-slate-200 text-sm font-medium leading-normal pb-2">Email Address</p>
              <input className="form-input w-full rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-sm" placeholder="email@example.com" type="email" />
            </label>
            {/* Password */}
            <label className="flex flex-col">
              <div className="flex justify-between items-center pb-2">
                <p className="text-[#111816] dark:text-slate-200 text-sm font-medium leading-normal">Password</p>
                {isLogin && <a className="text-xs text-primary font-bold hover:underline" href="#">Forgot?</a>}
              </div>
              <div className="relative">
                <input className="form-input w-full rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-sm" placeholder="Min. 8 characters" type="password" />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-xl">visibility_off</span>
              </div>
            </label>
            {/* Action Button */}
            <div className="pt-4">
              <button
                className="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0da06f] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Processing...
                  </span>
                ) : (
                  <>
                    <span>{isLogin ? 'Login' : 'Get Started'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dbe6e2] dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background-light dark:bg-background-dark px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            {/* Social Auth */}
            <button className="w-full flex items-center justify-center gap-3 rounded-lg h-12 border border-[#dbe6e2] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#111816] dark:text-white text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all" type="button">
              <Image
                alt="Google G logo for authentication"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG-UYyX8GYBfbLun8SRF6LZVD85k-f846_BGc2ZEzr9Ybex0YLVHr7dYWgtE8EXyehyML0A5Fyt7Ty8SNABoiiFDf3m5qgonOSEFdC4b_QWehL4jKE2VCQRpTRM09zR5VOcsiAEgGoErRxDSMvZskt0nL9mIIhzA5LTlq6WS34v9Bv-Ub_TrfUvhXbiECcDmfneD6EriGMWA9C9a6dbNYWEWQ9P64di21wfb2hTV-OEo9iErvHwvol7qfoGOKftXlCsPOlV7ruit4"
                width={20}
                height={20}
              />
              Sign in with Google
            </button>
          </form>
          {/* Legal Footer */}
          <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
            By creating an account, you agree to our
            <a className="text-primary hover:underline" href="#"> Terms of Service</a> and
            <a className="text-primary hover:underline" href="#"> Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

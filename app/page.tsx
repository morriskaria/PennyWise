import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <span className="material-symbols-outlined text-white">account_balance_wallet</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-neutral-slate">Pennywise</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#features">Features</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#pricing">Pricing</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#about">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <a className="text-sm font-semibold text-slate-600 hover:text-primary px-4" href="/auth">Login</a>
              <a className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20" href="/auth">Get Started</a>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              KRA PIN Ready Bookkeeping
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-slate tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              Master Your SME Finances <br /><span className="text-primary">with Ease</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Automate your bookkeeping, generate audit-ready KRA reports, and manage your Kenyan business operations from a single dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                Start Free Trial <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-primary text-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition-all">
                Book a Demo
              </button>
            </div>
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50 rounded-[3rem]"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-slate-200/50 rounded-md px-12 py-1 text-[10px] text-slate-400 uppercase tracking-widest font-bold">pennywise.ke/dashboard</div>
                  <div className="w-12"></div>
                </div>
                <Image
                  alt="Pennywise Dashboard Preview"
                  className="w-full h-auto object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD296hw3yuN8Hq3sTbb5Nb_8mOPdXYAkvYrCvgAKK0xNY462AByW2Gkan6qBGrYsznIkG8VKqpHQ6SM_nvlvlE3mu8o53GFYfzqe4rClYskOz-48Z0K0V-UvmYTiKQye_z6BLH_dM-t_KDs0sPnzO0HQxtfS7i9d88Mc_GX9o-N6tCmHgRem0HHbIUO9G4KKtKGJ0ynAb_LVLOTNSTW9Vu5MsfwCbF6mzqsB9CzLksx-sWntr3nsneyON313oSqSi3fBqCCJFJLBg"
                  width={1200}
                  height={600}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by 500+ Kenyan SMEs & Financial Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
              <div className="h-8 flex items-center font-black text-2xl text-slate-400">MPESA</div>
              <div className="h-8 flex items-center font-black text-2xl text-slate-400">KCB</div>
              <div className="h-8 flex items-center font-black text-2xl text-slate-400">EQUITY</div>
              <div className="h-8 flex items-center font-black text-2xl text-slate-400">KRA</div>
              <div className="h-8 flex items-center font-black text-2xl text-slate-400">CO-OP</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-slate mb-4">Built for Kenyan Business Success</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to stay compliant and profitable without the headache of manual accounting.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Track Income & Expenses</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Real-time tracking of every shilling. Categorize transactions automatically for clear visibility.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Tax-Ready Reports</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">KRA PIN ready documentation. Generate iTax compatible VAT and P.A.Y.E returns instantly.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Invoice Management</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Send professional invoices via email or WhatsApp. Track payments and send automated reminders.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Feature 4 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Multi-User Teams</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Collaborate with your accountant or staff. Role-based permissions keep your data safe.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Feature 5 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Secure Audit Logs</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Full accountability with immutable audit trails. Know exactly who changed what and when.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              {/* Feature 6 */}
              <div className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-slate mb-3">Mobile-First Design</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Run your business from your phone. Our responsive platform works wherever you are.</p>
                <a className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section className="py-24 bg-neutral-slate text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Deep Dive into Your Business</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Powerful tools designed for the unique needs of Kenyan SMEs.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Card 1 - Billing Automation */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <span className="material-symbols-outlined">receipt_long</span>
                    <h4 className="font-bold">Invoices</h4>
                  </div>
                  <div className="space-y-3 opacity-60">
                    <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                    <div className="h-10 bg-primary/20 rounded-lg flex items-center px-4 justify-between">
                      <div className="h-2 w-12 bg-primary/40 rounded"></div>
                      <div className="h-2 w-8 bg-primary/40 rounded"></div>
                    </div>
                    <div className="h-10 bg-slate-700/30 rounded-lg"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Billing Automation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Automatically generate invoices for recurring services and track aging debts in one view.</p>
              </div>

              {/* Card 2 - Compliance Reports */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <span className="material-symbols-outlined">monitoring</span>
                    <h4 className="font-bold">Financial Reports</h4>
                  </div>
                  <div className="flex items-end gap-2 h-24 mb-4">
                    <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/40 h-[60%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/60 h-[90%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary h-[75%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/40 h-[50%] rounded-t-sm"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded w-full"></div>
                </div>
                <h3 className="text-xl font-bold">Compliance Reports</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Access Profit & Loss, Balance Sheets, and Cash Flow statements with a single click.</p>
              </div>

              {/* Card 3 - Custom Configurations */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <span className="material-symbols-outlined">settings_suggest</span>
                    <h4 className="font-bold">Settings</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-16 bg-slate-700 rounded"></div>
                      <div className="h-4 w-8 bg-primary/30 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-24 bg-slate-700 rounded"></div>
                      <div className="h-4 w-8 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-20 bg-slate-700 rounded"></div>
                      <div className="h-4 w-8 bg-primary/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Custom Configurations</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Tune the system to your industry specifics. From retail to professional services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 relative">Ready to scale your business?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative">Join 500+ Kenyan entrepreneurs who trust Pennywise for their financial management.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <button className="w-full sm:w-auto bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">Start 14-Day Free Trial</button>
                <p className="text-sm font-medium text-white/60">No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">account_balance_wallet</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-neutral-slate">Pennywise</span>
              </div>
              <p className="text-slate-500 max-w-xs mb-8">Empowering Kenyan SMEs with smart bookkeeping and tax-readiness tools. Built in Nairobi, for Nairobi.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
                <a className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-xl">public</span>
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h5 className="font-bold text-neutral-slate mb-6">Product</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Invoicing</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Mobile App</a></li>
              </ul>
            </div>

            {/* App Areas Links */}
            <div>
              <h5 className="font-bold text-neutral-slate mb-6">App Areas</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Team Management</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Financial Instructions</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Compliance Reports</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Audit Logs</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h5 className="font-bold text-neutral-slate mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">KRA Support</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Tax Calendar</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2024 Pennywise Technologies. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:bg-success transition-all flex items-center justify-center group z-40" title="Quick Invoice">
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-110">chat</span>
      </button>
    </>
  );
}


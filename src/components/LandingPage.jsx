import { Link } from 'react-router-dom';
import { 
  Scissors, 
  Zap, 
  BarChart3, 
  QrCode, 
  ArrowRight,
  Link2,
  MousePointerClick,
  Shield
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-inter">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-[-10%] left-[-10%] w-125500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-indigo-900/10 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <Scissors className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white italic">Trimly</h1>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/login"
              className="px-6 py-2.5 text-slate-300 hover:text-white font-semibold transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Shorten URLs.<br />
              <span className="bg-linear-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                Track Everything.
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Create short, memorable links and track their performance with powerful analytics. 
              Perfect for marketers, developers, and content creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 group active:scale-95"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all border border-slate-700 active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-400 leading-relaxed">
                Generate short links instantly with our optimized infrastructure. No delays, no waiting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics</h3>
              <p className="text-slate-400 leading-relaxed">
                Track clicks, referrers, and user behavior with detailed analytics for every link.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">QR Codes</h3>
              <p className="text-slate-400 leading-relaxed">
                Automatically generate QR codes for all your links. Download and share anywhere.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <Link2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Links</h3>
              <p className="text-slate-400 leading-relaxed">
                Create branded short links with custom codes that match your brand identity.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <MousePointerClick className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Click Tracking</h3>
              <p className="text-slate-400 leading-relaxed">
                Monitor every click with detailed information about visitors and their behavior.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure</h3>
              <p className="text-slate-400 leading-relaxed">
                Your data is encrypted and secure. We take privacy seriously with enterprise-grade security.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-linear-to-br from-indigo-600/20 to-indigo-900/20 backdrop-blur-xl border border-indigo-800/50 rounded-3xl p-12 max-w-3xl mx-auto">
              <h3 className="text-3xl font-extrabold text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                Join thousands of users who trust Trimly for their link management needs.
              </p>
              <Link 
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold transition-all shadow-lg hover:shadow-white/20 active:scale-95"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Scissors className="text-white w-4 h-4" />
            </div>
            <span className="text-slate-400 text-sm font-semibold">
              © 2024 Trimly. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
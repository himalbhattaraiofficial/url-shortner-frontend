import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User,
  Mail, 
  Lock, 
  ArrowRight, 
  Eye,
  EyeClosed,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signup(formData.username, formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 font-inter relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-indigo-900/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md z-10">
        {/* Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create account</h2>
            <p className="text-slate-500 text-sm font-medium">
              Join us to start shortening and tracking your links.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  required 
                  minLength={3}
                  placeholder="johndoe"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/30 transition-all text-slate-200 placeholder:text-slate-700 font-medium"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  required 
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/30 transition-all text-slate-200 placeholder:text-slate-700 font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-12 outline-none focus:border-indigo-500/30 transition-all text-slate-200 placeholder:text-slate-700 font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 cursor-pointer"
                >
                  {showPassword ? <EyeClosed className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-bold py-4 rounded-2xl transition-all shadow-sm hover:shadow-indigo-500/10 flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center">
            <Link 
              to="/login"
              className="text-sm font-semibold text-slate-500"
            >
              Already have an account? <span className="text-indigo-400 hover:underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
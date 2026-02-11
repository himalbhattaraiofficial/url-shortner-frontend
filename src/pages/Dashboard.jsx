import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Link2, 
  Scissors, 
  Copy, 
  Check, 
  MousePointerClick, 
  History, 
  QrCode, 
  Trash2, 
  Zap,
  Clock,
  X,
  Download,
  ExternalLink,
  User, 
  LogOut,
  UserMinus,
  AlertTriangle,
  Lock,
  Eye,
  EyeClosed,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { urlAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, deleteAccount } = useAuth();
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedQrLink, setSelectedQrLink] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const urls = await urlAPI.getUrls();
      
      const transformedUrls = urls.map(url => ({
        id: url._id,
        original: url.originalUrl,
        shortened: url.shortUrl,
        clicks: url.clicks,
        date: formatDate(url.createdAt),
        qrCode: url.qrCode,
        title: url.title,
        isActive: url.isActive
      }));
      
      setLinks(transformedUrls);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
      setError('Failed to load your links');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsShortening(true);
    setError('');
    
    try {
      const newUrl = await urlAPI.createUrl(url);
      
      const transformedUrl = {
        id: newUrl._id,
        original: newUrl.originalUrl,
        shortened: newUrl.shortUrl,
        clicks: newUrl.clicks,
        date: 'Just now',
        qrCode: newUrl.qrCode,
        title: newUrl.title
      };
      
      setLinks([transformedUrl, ...links]);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsShortening(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const deleteLink = async (id) => {
    try {
      await urlAPI.deleteUrl(id);
      setLinks(links.filter(link => link.id !== id));
    } catch (err) {
      console.error('Failed to delete URL:', err);
      setError('Failed to delete link');
    }
  };

  const handleFinalDelete = async (e) => {
    e.preventDefault();
    if (!confirmPassword) return;
    
    setIsDeleting(true);
    setError('');
    
    try {
      const result = await deleteAccount(confirmPassword);
      
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error || 'Failed to delete account');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteStep(1);
    setConfirmPassword('');
    setShowPassword(false);
    setError('');
  };

  const downloadQRCode = (qrCodeDataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = fileName || 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col items-center overflow-hidden font-inter">

      {/* STICKY TOP SECTION */}
      <div className="w-full max-w-3xl pt-8 pb-6 flex-none bg-slate-950/95 backdrop-blur-xl z-40 px-0">
        <div className="mx-auto px-4 md:px-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
                <Scissors className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white italic">Trimly</h1>
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border cursor-pointer 
                  ${isProfileOpen 
                    ? 'bg-slate-800 border-indigo-500 text-indigo-400' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700 hover:text-white'}
                `}
              >
                <User className="w-5 h-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                  <div className="h-px bg-slate-800 mx-2 my-1" />
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      setShowDeleteModal(true);
                    }} 
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <UserMinus className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Input Field */}
          <div className="relative mb-10">
            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-3 p-2 bg-slate-900 rounded-2xl border border-slate-800 focus-within:border-indigo-500/50 transition-all shadow-2xl">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Link2 className="text-slate-500 w-5 h-5" />
                <input 
                  type="url" 
                  placeholder="Paste your long link here..." 
                  className="w-full py-3 text-slate-200 bg-transparent outline-none text-lg placeholder:text-slate-600 font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isShortening || !url}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center uppercase gap-2 cursor-pointer
                  ${isShortening ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98]'}
                `}
              >
                {isShortening ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Shorten <Zap className="w-4 h-4 fill-white text-white" /></>
                )}
              </button>
            </form>
          </div>

          <div className="border-t border-slate-900/80 mb-6 w-full" />

          {/* Sticky History Title */}
          <div className="flex items-center gap-2 text-slate-500 font-semibold tracking-wider uppercase text-[11px] px-1">
            <History className="w-3.5 h-3.5" />
            <span>Shortening History</span>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT SECTION */}
      <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-4 pb-12 px-4 md:px-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-900 rounded-2xl text-slate-600 font-medium">
              No links shortened yet.
            </div>
          ) : (
            links.map((link) => (
              <div 
                key={link.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 transition-all hover:bg-slate-900/80 group shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <a 
                      href={link.shortened}
                      className='text-lg font-bold text-indigo-400 font-mono-link tracking-tight'
                      target='_blank'
                      >{link.shortened}</a>
                      <button 
                        onClick={() => copyToClipboard(link.shortened, link.id)}
                        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer
                          ${copiedId === link.id ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}
                        `}
                      >
                        {copiedId === link.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === link.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-sm md:max-w-md font-medium">
                      {link.original}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MousePointerClick className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-bold font-mono-link">{link.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 font-semibold">
                        <Clock className="w-2.5 h-2.5" />
                        {link.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 border-l border-slate-800 pl-4">
                      <a href={link.original} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl text-slate-500 hover:text-emerald-400 hover:bg-slate-800 transition-all active:scale-90 flex items-center justify-center cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => setSelectedQrLink(link)} className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-all active:scale-90 cursor-pointer">
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteLink(link.id)} className="p-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-slate-800 transition-all active:scale-90 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQrLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-white tracking-tight">QR Code</h2>
              <button onClick={() => setSelectedQrLink(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-4 rounded-2xl aspect-square flex items-center justify-center mb-6">
              {selectedQrLink.qrCode ? (
                <img src={selectedQrLink.qrCode} alt="QR Code" className="w-full h-full object-contain" />
              ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950">
                  <rect width="100" height="100" fill="white" />
                  <path d="M10,10 h20 v20 h-20 z M15,15 v10 h10 v-10 z" fill="currentColor" />
                  <path d="M70,10 h20 v20 h-20 z M75,15 v10 h10 v-10 z" fill="currentColor" />
                  <path d="M10,70 h20 v20 h-20 z M15,75 v10 h10 v-10 z" fill="currentColor" />
                  <path d="M40,10 h10 v10 h-10 z M55,10 h10 v10 h-10 z M40,25 h5 v5 h-5 z M50,25 h15 v5 h-15 z M40,40 h20 v10 h-20 z M70,40 h20 v10 h-20 z" fill="currentColor" />
                  <path d="M10,40 h10 v20 h-10 z M25,40 h5 v5 h-5 z M10,65 h30 v5 h-30 z M45,55 h15 v20 h-15 z M70,55 h20 v10 h-20 z M65,70 h25 v20 h-25 z" fill="currentColor" />
                  <rect x="45" y="45" width="5" height="5" fill="currentColor" />
                </svg>
              )}
            </div>
            <div className="text-center space-y-2 mb-6">
              <p className="text-indigo-400 font-bold text-lg font-mono-link">{selectedQrLink.shortened}</p>
              <p className="text-slate-500 text-xs truncate px-4 font-medium">{selectedQrLink.original}</p>
            </div>
            <button 
              onClick={() => selectedQrLink.qrCode && downloadQRCode(selectedQrLink.qrCode, `qr-${selectedQrLink.id}.png`)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            {deleteStep === 1 ? (
              <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-3">Delete Account?</h2>
                
                <p className="text-slate-400 leading-relaxed mb-8">
                  This action is <span className="text-red-400 font-bold underline">permanent</span>. You will lose access to all your shortened links and history forever. This cannot be undone.
                </p>
                
                <div className="flex flex-col w-full gap-3">
                  <button 
                    onClick={() => setDeleteStep(2)}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Yes, Delete Permanently
                  </button>
                  <button 
                    onClick={closeDeleteModal}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFinalDelete} className="flex flex-col animate-in fade-in zoom-in-95 duration-300">
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2 text-center">Verify it's you</h2>
                <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
                  Please enter your password to confirm account deletion.
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 font-medium">{error}</p>
                  </div>
                )}

                <div className="relative mb-8">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-600" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    placeholder="Enter your password"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 outline-none rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 transition-all font-medium"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex flex-col w-full gap-3">
                  <button 
                    type="submit"
                    disabled={isDeleting || !confirmPassword}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:bg-red-900/50 disabled:text-white/30 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20 cursor-pointer"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Confirm Permanent Deletion'
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={closeDeleteModal}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
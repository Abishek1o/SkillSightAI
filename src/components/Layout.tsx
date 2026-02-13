import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, LayoutDashboard, Target, LogOut, Menu, X, Mail, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'New Analysis', href: '/analyze', icon: Target },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  SkillSight AI
                </span>
              </button>

              <div className="hidden md:flex items-center gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.href);
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </button>
                );
              })}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 mb-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  SkillSight AI
                </span>
                <p className="text-xs text-gray-500 font-medium">Elevate Your Career</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Customer Support</h3>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:abibavisathish@gmail.com"
                  className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 group"
                  title="Email Support"
                >
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abishek-n-s-790688310?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300 group"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/abishek.n.s?igsh=MTNwM3JjZGh6M3pzdw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-2xl transition-all duration-300 group"
                  title="Instagram Profile"
                >
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 font-medium text-center md:text-left">
              © {new Date().getFullYear()} SkillSight AI. Designed for professional growth.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

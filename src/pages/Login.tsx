
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Mail, Lock, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { auth } from '../firebase';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signUp, googleSignIn, resetPassword } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Full Authentication Error:", err);
      const errorCode = err.code;

      if (errorCode === 'auth/invalid-api-key' || errorCode === 'auth/api-key-not-valid') {
        setError('Firebase Configuration Error: Invalid API Key. Please verify your firebase.ts settings.');
      } else if (errorCode === 'auth/configuration-not-found') {
        setError('Firebase Configuration Error: Auth Domain or project ID not found.');
      } else if (errorCode === 'auth/user-not-found') {
        setError('Account not found. Please click "Sign up" below to create a new account.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (errorCode === 'auth/invalid-credential') {
        setError('Invalid credentials. If you haven\'t created an account yet, please click "Sign up" below.');
      } else if (errorCode === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (errorCode === 'auth/weak-password') {
        setError('Password is too weak. Please use at least 6 characters.');
      } else if (errorCode === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled in the Firebase Console. Go to Authentication > Sign-in method to enable it.');
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please check the console for details.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setError('');
    setMessage('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setMessage('');
    setIsLoading(true);
    try {
      if (!auth.app.options.apiKey || auth.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Firebase API Key is missing. Please configure src/firebase.ts");
      }
      await googleSignIn();
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block space-y-6 px-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              SkillSight AI
            </h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Discover Your<br />
              <span className="text-indigo-600">Skill Potential</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Intelligent skill gap analysis powered by AI to help students identify learning opportunities and accelerate career growth.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">Get instant insights into your skill gaps</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Personalized Learning Paths</h3>
                <p className="text-gray-600 text-sm">Customized recommendations for your goals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Your Progress</h3>
                <p className="text-gray-600 text-sm">Monitor your skill development journey</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="md:hidden mb-6 flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                SkillSight AI
              </h1>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to continue your skill journey' : 'Join us to start analyzing your skills'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">Or {isLogin ? 'sign in' : 'sign up'} with email</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{message}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

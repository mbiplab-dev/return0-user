// =============================================================================
// COMPONENT: Login Screen with i18n support
// File path: src/components/auth/LoginScreen.tsx
// =============================================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, Eye, EyeOff, ArrowRight, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';

interface LoginScreenProps {
  onAuthSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onAuthSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate form
      if (loginMethod === 'email' && !formData.email) {
        toast.error(t('errors.fillRequiredFields'));
        return;
      }
      if (loginMethod === 'phone' && !formData.phone) {
        toast.error(t('errors.fillRequiredFields'));
        return;
      }
      if (!formData.password) {
        toast.error(t('errors.fillRequiredFields'));
        return;
      }

      // Simulate successful login
      toast.success(t('success.accountVerified'));
      onAuthSuccess();
    } catch (error) {
      toast.error(t('errors.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Simulate Google auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('success.accountVerified'));
      onAuthSuccess();
    } catch (error) {
      toast.error(t('errors.networkError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Language Selector Button */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-2 p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-colors"
            >
              <Globe size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{t('common.language')}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute right-28 bottom-0 mt-2 z-50 origin-top-right animate-fade-in-down"> {/* Added origin and animation */}
                <LanguageSelector
                  compact={true}
                  className="w-48"
                  onSelect={() => setShowLanguageSelector(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-40 h-40 mx-auto mb-4"> {/* Removed gradient and flex styles */}
            <img src="/logo.png" alt="App Logo" className="w-full h-full object-contain" /> {/* Added img tag */}
          </div>
          <p className="text-gray-600">{t('auth.signInToAccount')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Login Method Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                loginMethod === 'email'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail size={18} className="inline mr-2" />
              {t('auth.email')}
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                loginMethod === 'phone'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone size={18} className="inline mr-2" />
              {t('common.phone')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === 'email' ? t('auth.email') : t('common.phone')}
              </label>
              <div className="relative">
                {loginMethod === 'email' ? (
                  <Mail size={20} className="absolute left-4 top-4 text-gray-400" />
                ) : (
                  <Phone size={20} className="absolute left-4 top-4 text-gray-400" />
                )}
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  value={loginMethod === 'email' ? formData.email : formData.phone}
                  onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder={loginMethod === 'email' ? t('auth.email') : t('common.phone')}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all duration-200 bg-gray-50/50"
                  placeholder={t('auth.password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t('auth.login')}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">{t('auth.orContinueWith')}</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">{t('auth.signInWith')} Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
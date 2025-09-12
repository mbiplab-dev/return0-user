import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Shield, Activity, Smartphone, ChevronRight, Users, Navigation, Heart, CreditCard, Globe, Bell, MapPin, HelpCircle, Settings, LogOut } from "lucide-react";
import Header from "../layout/Header";
import LanguageSelector from "../common/LanguageSelector";

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Header title={t('profile.profile')} />
      <div className="px-4 space-y-6">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-opacity-10 backdrop-blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white border-opacity-30">
                <User className="text-white" size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Alex Johnson</h2>
                <p className="text-purple-100">{t('profile.touristLocation', { location: 'Dubai, UAE' })}</p>
                <div className="flex items-center mt-2">
                  <Shield className="text-green-300 mr-1" size={16} />
                  <span className="text-sm text-green-300 font-medium">{t('profile.verifiedIdentity')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white border-opacity-20">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-purple-100">{t('profile.countries')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">48</p>
                <p className="text-xs text-purple-100">{t('profile.trips')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-xs text-purple-100">{t('home.safetyScore')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <Activity className="text-red-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">{t('profile.healthStatus')}</p>
                <p className="text-sm text-green-600">{t('profile.allNormal')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <Smartphone className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">{t('profile.deviceStatus')}</p>
                <p className="text-sm text-green-600">{t('profile.connected')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="space-y-3">
          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                <Shield className="text-blue-600" size={20} />
              </div>
              <div className="text-left">
                <span className="font-medium text-gray-900">{t('profile.digitalIdentityWallet')}</span>
                <p className="text-xs text-gray-500">{t('profile.blockchainVerified')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="text-purple-600" size={20} />
              </div>
              <div className="text-left">
                <span className="font-medium text-gray-900">{t('notifications.emergencyContacts')}</span>
                <p className="text-xs text-gray-500">{t('profile.manageTrustedContacts')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-xl group-hover:scale-110 transition-transform">
                <Navigation className="text-green-600" size={20} />
              </div>
              <div className="text-left">
                <span className="font-medium text-gray-900">{t('profile.travelHistory')}</span>
                <p className="text-xs text-gray-500">{t('profile.viewPastTrips')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-xl group-hover:scale-110 transition-transform">
                <Heart className="text-red-600" size={20} />
              </div>
              <div className="text-left">
                <span className="font-medium text-gray-900">{t('profile.healthMonitoring')}</span>
                <p className="text-xs text-gray-500">{t('profile.iotDevices')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform">
                <CreditCard className="text-orange-600" size={20} />
              </div>
              <div className="text-left">
                <span className="font-medium text-gray-900">{t('profile.travelInsurance')}</span>
                <p className="text-xs text-gray-500">{t('profile.policyDetails')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">{t('profile.settingsPreferences')}</h3>
          <div className="space-y-4">
            {/* Language Selector */}
            <LanguageSelector showFlag={true} showNativeName={true} />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="text-purple-600" size={18} />
                <span className="text-sm font-medium text-gray-900">{t('profile.pushNotifications')}</span>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="text-green-600" size={18} />
                <span className="text-sm font-medium text-gray-900">{t('profile.locationSharing')}</span>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="text-red-600" size={18} />
                <span className="text-sm font-medium text-gray-900">{t('profile.healthMonitoring')}</span>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <HelpCircle className="text-gray-600" size={20} />
              <span className="font-medium text-gray-900">{t('profile.helpSupport')}</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Settings className="text-gray-600" size={20} />
              <span className="font-medium text-gray-900">{t('profile.advancedSettings')}</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-red-200 flex items-center justify-between hover:shadow-md transition-all duration-200 hover:bg-red-50">
            <div className="flex items-center space-x-3">
              <LogOut className="text-red-600" size={20} />
              <span className="font-medium text-red-600">{t('profile.signOut')}</span>
            </div>
            <ChevronRight className="text-red-400" size={20} />
          </button>
        </div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">{t('profile.appVersion')}</p>
          <p className="text-xs text-gray-400">{t('profile.version', { version: '2.1.0' })}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
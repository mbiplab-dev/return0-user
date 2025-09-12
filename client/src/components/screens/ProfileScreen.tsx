import React from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Shield,
  Activity,
  Smartphone,
  ChevronRight,
  Users,
  Navigation,
  Heart,
  Globe,
  Bell,
  MapPin,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import Header from "../layout/Header";
import LanguageSelector from "../common/LanguageSelector";

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <Header title={t("profile.profile")}/>

      {/* Profile Header */}
      <div className="px-6 pt-6 pb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-100">
            <User className="text-gray-500" size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Alex Johnson</h2>
            <p className="text-gray-600 mt-1">
              {t("profile.touristLocation", { location: "Dubai, UAE" })}
            </p>
            <div className="flex items-center mt-2">
              <Shield className="text-green-500 mr-1" size={16} />
              <span className="text-xs text-green-600 font-medium">
                {t("profile.verifiedIdentity")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="space-y-3 px-6">
        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="text-blue-600" size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900">
                {t("profile.sections.digitalIdentityWallet")}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {t("profile.sections.blockchainVerified")}
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>

        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900">
                {t("notifications.emergencyContacts")}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {t("profile.sections.manageTrustedContacts")}
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>

        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Navigation className="text-green-600" size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900">
                {t("profile.sections.travelHistory")}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {t("profile.sections.viewPastTrips")}
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>

        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Heart className="text-red-600" size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-gray-900">
                {t("profile.sections.healthMonitoring")}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {t("profile.sections.iotDevices")}
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>
      </div>

      {/* Settings Section */}
      <div className="mx-6 px-6 mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">
          {t("profile.sections.settingsPreferences")}
        </h3>
        <div className="space-y-4">
          {/* Language Selector */}
          <LanguageSelector showFlag={true} showNativeName={true} />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="text-gray-600" size={18} />
              <span className="text-sm font-medium text-gray-900">
                {t("profile.sections.pushNotifications")}
              </span>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-600" size={18} />
              <span className="text-sm font-medium text-gray-900">
                {t("profile.sections.locationSharing")}
              </span>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="text-gray-600" size={18} />
              <span className="text-sm font-medium text-gray-900">
                {t("profile.sections.healthMonitoring")}
              </span>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full p-1 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full ml-6 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="px-6 mt-6 space-y-3">
        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <HelpCircle className="text-gray-600" size={20} />
            <span className="font-semibold text-gray-900">
              {t("profile.sections.helpSupport")}
            </span>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>

        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4">
            <Settings className="text-gray-600" size={20} />
            <span className="font-semibold text-gray-900">
              {t("profile.sections.advancedSettings")}
            </span>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </button>

        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-red-200 flex items-center justify-between hover:shadow-md transition-all duration-200 hover:bg-red-50">
          <div className="flex items-center space-x-4">
            <LogOut className="text-red-600" size={20} />
            <span className="font-semibold text-red-600">
              {t("profile.signOut")}
            </span>
          </div>
          <ChevronRight className="text-red-400" size={20} />
        </button>
      </div>

      {/* App Version */}
      <div className="px-6 pt-6 pb-8 text-center">
        <p className="text-xs text-gray-400">{t("profile.appVersion")}</p>
        <p className="text-xs text-gray-400">
          {t("profile.version", { version: "2.1.0" })}
        </p>
      </div>
    </div>
  );
};

export default ProfileScreen;

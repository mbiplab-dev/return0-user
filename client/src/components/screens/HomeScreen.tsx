import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Heart, MapPin, Phone, QrCode, Shield, Star, Users, Plus, Calendar, Plane } from "lucide-react";
import { getTimeBasedGreeting } from '../../utils/i18n';

const HomeScreen = ({
  currentLocation,
  safetyScore,
  groupMembers,
  notifications,
  onAddTripPress,
  trips,
}) => {
  const { t, i18n } = useTranslation();
  
  // Get localized greeting based on time of day
  const greeting = getTimeBasedGreeting(t);
  
  // Format numbers according to locale
  const formattedScore = safetyScore.toFixed(0);
  const stepCount = 8421;
  const formattedSteps = stepCount.toLocaleString(i18n.language);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('auth.welcomeBack')}</p>
            <h1 className="text-xl font-bold text-gray-900">{greeting}</h1>
          </div>
          <button className="p-3 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Add Trip Button - Prominent Uber-style button */}
      <button
        onClick={onAddTripPress}
        className="mx-6 mt-6 bg-black text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Plus size={24} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white leading-tight">{t('home.planNewTrip')}</h3>
            <p className="text-white/80 text-sm">{t('home.addDestinations')}</p>
          </div>
          <Plane size={24} className="text-white/80" />
        </div>
      </button>

      {/* Current Trips */}
      {trips.length > 0 && (
        <div className="mx-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('home.yourTrips')}</h3>
            <button className="text-sm text-blue-600 font-medium">{t('home.viewAll')}</button>
          </div>
          <div className="space-y-3">
            {trips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{trip.name}</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                    {t('home.members', { count: trip.members.length })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{new Date(trip.startDate).toLocaleDateString(i18n.language)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions - Uber-style grid */}
      <div className="mx-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
              <QrCode size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{t('home.quickCheckin')}</h4>
            <p className="text-gray-500 text-xs">{t('home.scanLocationCode')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{t('home.groupStatus')}</h4>
            <p className="text-gray-500 text-xs">{t('home.members', { count: groupMembers.length })}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-3">
              <Shield size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{t('home.safetyZone')}</h4>
            <p className="text-gray-500 text-xs">{t('home.viewSafeAreas')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
              <Phone size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{t('home.emergency')}</h4>
            <p className="text-gray-500 text-xs">{t('home.quickContacts')}</p>
          </div>
        </div>
      </div>

      {/* Live Status Cards - Uber-style cards */}
      <div className="mx-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('home.liveStatus')}</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Heart size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('home.healthMonitor')}</p>
                  <p className="font-semibold text-gray-900">{t('home.normal')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{t('home.hrBpm', { bpm: 72 })}</p>
                <p className="text-xs text-gray-500">{t('home.stepsToday', { steps: formattedSteps })}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('home.locationStatus')}</p>
                  <p className="font-semibold text-gray-900">{t('home.safeZone')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{t('home.touristDistrict')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('home.travelGroup')}</p>
                  <p className="font-semibold text-gray-900">
                    {groupMembers.filter((m) => m.status === "safe").length}/{groupMembers.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{t('home.membersCheckedIn')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Score Card - Uber-style card */}
      <div className="mx-6 mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('home.safetyScore')}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{formattedScore}</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= safetyScore / 20
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={20} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">{t('home.protected')}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mx-6 mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{t('home.recentActivity')}</h3>
          <button className="text-sm text-blue-600 font-medium">{t('home.viewAll')}</button>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notif) => (
            <div key={notif.id} className="flex items-start space-x-3">
              <div
                className={`mt-1 w-2 h-2 rounded-full ${
                  notif.type === "warning"
                    ? "bg-orange-400"
                    : notif.type === "success"
                    ? "bg-green-400"
                    : notif.type === "emergency"
                    ? "bg-red-400"
                    : notif.type === "health"
                    ? "bg-purple-400"
                    : "bg-blue-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">{getLocalizedNotificationMessage(notif, t)}</p>
                <p className="text-xs text-gray-500">{getRelativeTime(notif.time, i18n.language, t)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get localized notification messages
const getLocalizedNotificationMessage = (notification: any, t: any): string => {
  // Map notification messages to translation keys
  const messageMap: { [key: string]: string } = {
    "Approaching unsafe area - Old Town District": "notifications.messages.approachingUnsafeArea",
    "Group member Sarah checked in safely at Burj Khalifa": "notifications.messages.memberCheckedIn",
    "Welcome to Dubai! Safety protocols activated": "notifications.messages.welcomeMessage",
    "Emergency contact updated successfully": "notifications.messages.emergencyContactUpdated",
    "Heart rate elevated - take a break": "notifications.messages.heartRateElevated"
  };

  const translationKey = messageMap[notification.message];
  if (translationKey) {
    // Extract dynamic values from the message
    if (notification.message.includes("Approaching unsafe area")) {
      const area = notification.message.split(" - ")[1];
      return t(translationKey, { area });
    }
    if (notification.message.includes("Group member")) {
      const parts = notification.message.match(/Group member (\w+) checked in safely at (.+)/);
      if (parts) {
        return t(translationKey, { name: parts[1], location: parts[2] });
      }
    }
    if (notification.message.includes("Welcome to")) {
      const location = notification.message.match(/Welcome to (.+?)!/)?.[1];
      return t(translationKey, { location });
    }
    return t(translationKey);
  }
  
  // Fallback to original message if no translation found
  return notification.message;
};

// Helper function to get relative time
const getRelativeTime = (time: number, language: string, t: any): string => {
  const now = Date.now();
  const diffSeconds = Math.floor((now - time) / 1000);
  
  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffSeconds / 86400);
    return `${days}d ago`;
  }
};

export default HomeScreen;
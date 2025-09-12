// =============================================================================
// Updated HomeScreen.tsx with navigation to new screens
// =============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Heart, MapPin, Phone, QrCode, Shield, Star, Users, Plus, Calendar, Plane } from "lucide-react";
import QuickActionButton from "../common/QuickActionButton";
import StatusCard from "../common/StatusCard";
import { getTimeBasedGreeting, formatNumber, getRelativeTime } from "../../utils/i18n";
import type { GroupMember, Notification } from "../../types";
import type { Trip } from "../../types/trip";

interface HomeScreenProps {
  currentLocation: string;
  safetyScore: number;
  groupMembers: GroupMember[];
  notifications: Notification[];
  onAddTripPress: () => void;
  onQuickCheckinPress: () => void;
  onGroupStatusPress: () => void;
  onTripDetailsPress: () => void;
  onEmergencyContactsPress: () => void;
  trips: Trip[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLocation,
  safetyScore,
  groupMembers,
  notifications,
  onAddTripPress,
  onQuickCheckinPress,
  onGroupStatusPress,
  onTripDetailsPress,
  onEmergencyContactsPress,
  trips,
}) => {
  const { t, i18n } = useTranslation();
  
  // Get localized greeting based on time of day
  const greeting = getTimeBasedGreeting(t);
  
  // Format numbers according to locale
  const formattedScore = formatNumber(safetyScore, i18n.language);
  const stepCount = 8421; // Example step count
  const formattedSteps = formatNumber(stepCount, i18n.language);

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{greeting}, Alex</h1>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">{currentLocation}</span>
              </div>
            </div>
            <button className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Bell size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1">{t('home.safetyScore')}</p>
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">{formattedScore}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= safetyScore / 20
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <Shield size={28} className="text-green-400" />
              </div>
              <span className="text-xs text-gray-300">{t('home.protected')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Trip Button - Prominent placement */}
      <button
        onClick={onAddTripPress}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Plus size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">{t('home.planNewTrip')}</h3>
            <p className="text-blue-100 text-sm">{t('home.addDestinations')}</p>
          </div>
          <Plane size={28} className="text-white/80" />
        </div>
      </button>

      {/* Current Trips */}
      {trips.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{t('home.yourTrips')}</h3>
            <button className="text-sm text-blue-600 font-medium">{t('home.viewAll')}</button>
          </div>
          <div className="space-y-3">
            {trips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{trip.name}</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {t('home.members', { count: trip.members.length })}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(trip.startDate).toLocaleDateString(i18n.language)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <QuickActionButton
          icon={QrCode}
          title={t('home.quickCheckin')}
          subtitle={t('home.scanLocationCode')}
          color="bg-blue-500"
          onClick={onQuickCheckinPress}
        />
        <QuickActionButton
          icon={Users}
          title={t('home.groupStatus')}
          subtitle={t('home.members', { count: groupMembers.length })}
          color="bg-purple-500"
          onClick={onGroupStatusPress}
        />
        <QuickActionButton
          icon={Plane}
          title={t('trip.tripDetails')}
          subtitle="View trip information"
          color="bg-green-500"
          onClick={onTripDetailsPress}
        />
        <QuickActionButton
          icon={Phone}
          title={t('home.emergency')}
          subtitle={t('home.quickContacts')}
          color="bg-orange-500"
          onClick={onEmergencyContactsPress}
        />
      </div>

      {/* Live Status */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{t('home.liveStatus')}</h3>
        <StatusCard
          icon={Heart}
          title={t('home.healthMonitor')}
          value={t('home.normal')}
          subtitle={`${t('home.hrBpm', { bpm: 72 })} • ${t('home.stepsToday', { steps: formattedSteps })}`}
          color="red"
        />
        <StatusCard
          icon={MapPin}
          title={t('home.locationStatus')}
          value={t('home.safeZone')}
          subtitle={t('home.touristDistrict')}
          color="green"
        />
        <StatusCard
          icon={Users}
          title={t('home.travelGroup')}
          value={`${groupMembers.filter((m) => m.status === "safe").length}/${groupMembers.length}`}
          subtitle={t('home.membersCheckedIn')}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{t('home.recentActivity')}</h3>
          <button className="text-sm text-blue-600 font-medium">{t('home.viewAll')}</button>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notif) => (
            <div key={notif.id} className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${
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
              <div className="flex-1">
                <p className="text-sm text-gray-900">{getLocalizedNotificationMessage(notif, t)}</p>
                <p className="text-xs text-gray-500 mt-1">{getRelativeTime(notif.time, i18n.language, t)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get localized notification messages
const getLocalizedNotificationMessage = (notification: Notification, t: any): string => {
  // Map notification messages to translation keys
  const messageMap: { [key: string]: string } = {
    "Approaching unsafe area - Old Town District": "notifications.approachingUnsafeArea",
    "Group member Sarah checked in safely at Burj Khalifa": "notifications.memberCheckedIn",
    "Welcome to Dubai! Safety protocols activated": "notifications.welcomeMessage",
    "Emergency contact updated successfully": "notifications.emergencyContactUpdated",
    "Heart rate elevated - take a break": "notifications.heartRateElevated"
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

export default HomeScreen;
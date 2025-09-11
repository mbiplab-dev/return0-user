// =============================================================================
// COMPONENT: Home Screen
// File path: src/screens/HomeScreen.tsx
// =============================================================================

import { Bell, Heart, MapPin, Phone, QrCode, Shield, Star, Users, Plus, Calendar, Plane } from "lucide-react";
import QuickActionButton from "../common/QuickActionButton";
import StatusCard from "../common/StatusCard";
import type { GroupMember, Notification } from "../../types";
import type { Trip } from "../../types/trip";

interface HomeScreenProps {
  currentLocation: string;
  safetyScore: number;
  groupMembers: GroupMember[];
  notifications: Notification[];
  onAddTripPress: () => void;
  trips: Trip[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLocation,
  safetyScore,
  groupMembers,
  notifications,
  onAddTripPress,
  trips,
}) => (
  <div className="space-y-6 p-4">
    {/* Welcome Header */}
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Good evening, Alex</h1>
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
            <p className="text-gray-300 text-sm mb-1">Safety Score</p>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">{safetyScore}</span>
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
            <span className="text-xs text-gray-300">Protected</span>
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
          <h3 className="text-lg font-bold">Plan New Trip</h3>
          <p className="text-blue-100 text-sm">Add destinations, members & itinerary</p>
        </div>
        <Plane size={28} className="text-white/80" />
      </div>
    </button>

    {/* Current Trips */}
    {trips.length > 0 && (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Your Trips</h3>
          <button className="text-sm text-blue-600 font-medium">View all</button>
        </div>
        <div className="space-y-3">
          {trips.slice(0, 2).map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{trip.name}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {trip.members.length} members
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{new Date(trip.startDate).toLocaleDateString()}</span>
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
        title="Quick Check-in"
        subtitle="Scan location code"
        color="bg-blue-500"
      />
      <QuickActionButton
        icon={Users}
        title="Group Status"
        subtitle={`${groupMembers.length} members`}
        color="bg-purple-500"
      />
      <QuickActionButton
        icon={Shield}
        title="Safety Zone"
        subtitle="View safe areas"
        color="bg-green-500"
      />
      <QuickActionButton
        icon={Phone}
        title="Emergency"
        subtitle="Quick contacts"
        color="bg-orange-500"
      />
    </div>

    {/* Live Status */}
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Live Status</h3>
      <StatusCard
        icon={Heart}
        title="Health Monitor"
        value="Normal"
        subtitle="HR: 72 BPM • 8,421 steps today"
        color="red"
      />
      <StatusCard
        icon={MapPin}
        title="Location Status"
        value="Safe Zone"
        subtitle="Tourist district • High security area"
        color="green"
      />
      <StatusCard
        icon={Users}
        title="Travel Group"
        value={`${groupMembers.filter((m) => m.status === "safe").length}/${
          groupMembers.length
        }`}
        subtitle="Members checked in safely"
        color="purple"
      />
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 font-medium">View all</button>
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
              <p className="text-sm text-gray-900">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeScreen;
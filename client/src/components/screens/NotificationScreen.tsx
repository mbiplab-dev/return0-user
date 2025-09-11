// =============================================================================
// COMPONENT: Notification Screen
// File path: src/screens/NotificationScreen.tsx

import { AlertTriangle, Bell, CheckCircle, ChevronRight, Clock, Headphones, Heart, LogOut, Phone, Shield, Zap } from "lucide-react";
import Header from "../layout/Header";
import type { Notification } from "../../types";

// =============================================================================
interface NotificationScreenProps {
  notifications: Notification[];
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({
  notifications,
}) => (
  <div className="space-y-4">
    <Header
      title="Notifications"
      rightAction={
        <div className="flex space-x-3">
          <button className="text-sm text-blue-600 font-medium">Filter</button>
          <button className="text-sm text-blue-600 font-medium">
            Mark all read
          </button>
        </div>
      }
    />

    <div className="px-4 space-y-4">
      {/* Notification Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["All", "Safety", "Group", "Health", "Emergency"].map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white rounded-2xl p-4 border border-gray-100 relative"
          >
            {notif.priority === "critical" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl" />
            )}
            {notif.priority === "high" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 rounded-l-2xl" />
            )}

            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  notif.type === "warning"
                    ? "bg-orange-100"
                    : notif.type === "success"
                    ? "bg-green-100"
                    : notif.type === "emergency"
                    ? "bg-red-100"
                    : notif.type === "health"
                    ? "bg-purple-100"
                    : "bg-blue-100"
                }`}
              >
                {notif.type === "warning" ? (
                  <AlertTriangle size={20} className="text-orange-600" />
                ) : notif.type === "success" ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : notif.type === "emergency" ? (
                  <Zap size={20} className="text-red-600" />
                ) : notif.type === "health" ? (
                  <Heart size={20} className="text-purple-600" />
                ) : (
                  <Bell size={20} className="text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notif.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {notif.time}
                  </p>
                  {notif.priority === "critical" && (
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full font-medium">
                      Critical
                    </span>
                  )}
                  {notif.priority === "high" && (
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium">
                      High
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
            <div className="flex items-center space-x-2">
              <Phone className="text-red-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-red-900 text-sm">Emergency</p>
                <p className="text-xs text-red-700">999</p>
              </div>
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-blue-900 text-sm">
                  Tourist Police
                </p>
                <p className="text-xs text-blue-700">+971-4-TOURIST</p>
              </div>
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <div className="flex items-center space-x-2">
              <Heart className="text-green-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-green-900 text-sm">Medical</p>
                <p className="text-xs text-green-700">+971-800-HEALTH</p>
              </div>
            </div>
          </button>

          <button className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <div className="flex items-center space-x-2">
              <Headphones className="text-purple-600" size={18} />
              <div className="text-left">
                <p className="font-medium text-purple-900 text-sm">Support</p>
                <p className="text-xs text-purple-700">24/7 Help</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);



export default NotificationScreen;

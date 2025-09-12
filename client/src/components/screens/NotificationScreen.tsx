// =============================================================================
// COMPONENT: Notification Screen with i18n support
// File path: src/components/screens/NotificationScreen.tsx
// =============================================================================

import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Headphones, 
  Heart, 
  Phone, 
  Shield, 
  Zap 
} from "lucide-react";
import Header from "../layout/Header";
import { useTranslation } from "../../hooks/useTranslation";
import type { Notification } from "../../types";

interface NotificationScreenProps {
  notifications: Notification[];
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({
  notifications,
}) => {
  const { t, isRTL } = useTranslation();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle size={20} className="text-orange-600" />;
      case "success":
        return <CheckCircle size={20} className="text-green-600" />;
      case "emergency":
        return <Zap size={20} className="text-red-600" />;
      case "health":
        return <Heart size={20} className="text-purple-600" />;
      default:
        return <Bell size={20} className="text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-100";
      case "success":
        return "bg-green-100";
      case "emergency":
        return "bg-red-100";
      case "health":
        return "bg-purple-100";
      default:
        return "bg-blue-100";
    }
  };

  const categories = [
    { key: 'all', labelKey: 'notifications.categories.all' },
    { key: 'safety', labelKey: 'notifications.categories.safety' },
    { key: 'group', labelKey: 'notifications.categories.group' },
    { key: 'health', labelKey: 'notifications.categories.health' },
    { key: 'emergency', labelKey: 'notifications.categories.emergency' },
  ];

  const emergencyContacts = [
    {
      icon: Phone,
      titleKey: 'notifications.emergencyContacts',
      subtitle: '999',
      bgColor: 'bg-red-50 hover:bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      subtitleColor: 'text-red-700'
    },
    {
      icon: Shield,
      titleKey: 'notifications.touristPolice',
      subtitle: '+971-4-TOURIST',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      subtitleColor: 'text-blue-700'
    },
    {
      icon: Heart,
      titleKey: 'notifications.medical',
      subtitle: '+971-800-HEALTH',
      bgColor: 'bg-green-50 hover:bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      subtitleColor: 'text-green-700'
    },
    {
      icon: Headphones,
      titleKey: 'notifications.support',
      subtitleKey: 'notifications.help24x7',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-900',
      subtitleColor: 'text-purple-700'
    },
  ];

  return (
    <div className={`space-y-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header
        titleKey="notifications.notifications"
        rightAction={
          <div className={`flex space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <button className="text-sm text-blue-600 font-medium">
              {t('common.filter')}
            </button>
            <button className="text-sm text-blue-600 font-medium">
              {t('notifications.markAllRead')}
            </button>
          </div>
        }
      />

      <div className="px-4 space-y-4">
        {/* Notification Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.key}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap"
            >
              {t(category.labelKey)}
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
                <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-1 h-full bg-red-500 ${isRTL ? 'rounded-r-2xl' : 'rounded-l-2xl'}`} />
              )}
              {notif.priority === "high" && (
                <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-1 h-full bg-orange-500 ${isRTL ? 'rounded-r-2xl' : 'rounded-l-2xl'}`} />
              )}

              <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-xl ${getNotificationBgColor(notif.type)}`}>
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {notif.message}
                  </p>
                  <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <p className={`text-xs text-gray-500 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
                      {notif.time}
                    </p>
                    {notif.priority === "critical" && (
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full font-medium">
                        {t('notifications.priority.critical')}
                      </span>
                    )}
                    {notif.priority === "high" && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium">
                        {t('notifications.priority.high')}
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
          <h3 className={`font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('notifications.emergencyContacts')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact, index) => (
              <button 
                key={index}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${contact.bgColor}`}
              >
                <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <contact.icon className={contact.iconColor} size={18} />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className={`font-medium text-sm ${contact.textColor}`}>
                      {t(contact.titleKey)}
                    </p>
                    <p className={`text-xs ${contact.subtitleColor}`}>
                      {contact.subtitleKey ? t(contact.subtitleKey) : contact.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
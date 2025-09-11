// =============================================================================
// COMPONENT: Bottom Navigation
// File path: src/components/navigation/BottomNavigation.tsx
// =============================================================================

import { Home, MapPin, Bell, User, AlertTriangle } from "lucide-react";
import type { ActiveTab, SOSState } from "../../types";

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onSOSPress: () => void;
  notificationCount: number;
  sosState: SOSState;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  onSOSPress,
  notificationCount,
}) => (
  <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
    <div className="flex justify-around items-center">
      {[
        { tab: "home" as ActiveTab, icon: Home, label: "Home" },
        { tab: "map" as ActiveTab, icon: MapPin, label: "Map" },
        {
          tab: "notifications" as ActiveTab,
          icon: Bell,
          label: "Alerts",
          badge: notificationCount,
        },
        { tab: "profile" as ActiveTab, icon: User, label: "Profile" },
        { tab: "SOS" as ActiveTab, icon: AlertTriangle, label: "SOS", isSpecial: true },
      ].map(({ tab, icon: Icon, label, badge, isSpecial }) => (
        <button
          key={tab}
          onClick={() => {
            if (isSpecial) {
              onSOSPress();
            } else {
              onTabChange(tab);
            }
          }}
          className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === tab
              ? isSpecial
                ? "bg-red-500 text-white"
                : "bg-black text-white"
              : isSpecial
              ? "text-red-500 hover:text-red-700"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <div className="relative">
            <Icon size={24} />
            {badge && badge > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </div>
          <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default BottomNavigation;
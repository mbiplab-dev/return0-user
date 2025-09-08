// =============================================================================
// COMPONENT: Map Screen
// File path: src/screens/MapScreen.tsx
// =============================================================================

import { AlertTriangle, Locate, Navigation, Search, Users } from "lucide-react";
import GroupMemberItem from "../common/GroupMemberItem";
import Header from "../layout/Header";
import type { GroupMember } from "../../types";

interface MapScreenProps {
  groupMembers: GroupMember[];
  mapContainer: React.RefObject<HTMLDivElement>;
}

const MapScreen: React.FC<MapScreenProps> = ({
  groupMembers,
  mapContainer,
}) => (
  <div className="space-y-4">
    <Header
      title="Live Map"
      rightAction={
        <div className="flex space-x-2">
          <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Locate size={18} className="text-gray-600" />
          </button>
          <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Search size={18} className="text-gray-600" />
          </button>
        </div>
      }
    />

    <div className="px-4 space-y-4">
      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapContainer}
          className="w-full h-96 rounded-2xl overflow-hidden shadow-lg"
        />

        {/* Map Overlay Controls */}
        <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm font-medium text-gray-700">You</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg">
          <button className="text-sm font-medium text-blue-600">
            Recenter
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
          <Users className="text-purple-600 mx-auto mb-2" size={24} />
          <p className="text-lg font-bold text-gray-900">
            {groupMembers.filter((m) => m.status === "safe").length}/
            {groupMembers.length}
          </p>
          <p className="text-xs text-gray-500">Safe</p>
        </div>

        <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
          <AlertTriangle className="text-orange-600 mx-auto mb-2" size={24} />
          <p className="text-lg font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500">Warnings</p>
        </div>

        <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
          <Navigation className="text-blue-600 mx-auto mb-2" size={24} />
          <p className="text-lg font-bold text-gray-900">0.8km</p>
          <p className="text-xs text-gray-500">To hotel</p>
        </div>
      </div>

      {/* Group Members */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Travel Group</h3>
        <div className="space-y-3">
          {groupMembers.map((member) => (
            <GroupMemberItem key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MapScreen;

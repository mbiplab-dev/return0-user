// =============================================================================
// COMPONENT: Modern SOS Interface (Mobile-like UI)
// File path: src/components/emergency/SOSInterface.tsx
// =============================================================================

import {
  Zap,
  MapPin,
  Phone,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import type { SOSState } from "../../types";

// =============================================================================
interface SOSInterfaceProps {
  sosState: SOSState;
  swipeProgress: number;
  currentLocation: string;
  onSwipeStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onClose: () => void;
  sosMapContainer: React.RefObject<HTMLDivElement>;
}

const SOSInterface: React.FC<SOSInterfaceProps> = ({
  sosState,
  swipeProgress,
  currentLocation,
  onSwipeStart,
  onClose,
  sosMapContainer,
}) => {
  if (sosState === "inactive") return null;

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Emergency SOS</h1>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 py-4">
        {/* SWIPE STATE */}
        {sosState === "swipe" && (
          <>
            {/* Hero Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={36} className="text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Emergency SOS
              </h2>
              <p className="text-gray-600 text-sm">
                Slide to call emergency services
              </p>
            </div>

            {/* Info Cards */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Current Location
                  </h3>
                  <p className="text-sm text-gray-600">{currentLocation}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Emergency Services
                  </h3>
                  <p className="text-sm text-gray-600">
                    Police, Medical, Tourist Support
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Emergency Contacts
                  </h3>
                  <p className="text-sm text-gray-600">
                    4 contacts will be notified
                  </p>
                </div>
              </div>
            </div>

            {/* Swipe Control */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="relative h-16 bg-gray-200 rounded-full flex items-center px-2 overflow-hidden">

                {/* Slider button */}
                <div
                  className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-150 ease-out"
                  style={{
                    transform: `translateX(${Math.min(
                      (swipeProgress / 100) * 280,
                      280
                    )}px) scale(${swipeProgress > 80 ? 1.1 : 1})`,
                  }}
                  onMouseDown={onSwipeStart}
                  onTouchStart={onSwipeStart}
                >
                  {swipeProgress > 80 ? (
                    <CheckCircle className="text-red-600" size={24} />
                  ) : (
                    <ArrowRight className="text-red-600" size={24} />
                  )}
                </div>

                {/* Text overlay */}
                {swipeProgress < 50 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <span className="text-gray-600 font-medium text-sm ml-8">
                      Slide to send SOS
                    </span>
                  </div>
                )}
                {swipeProgress >= 50 && swipeProgress < 90 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <span className="text-white font-medium text-sm">
                      Keep sliding...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* SENDING STATE */}
        {sosState === "sending" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sending Emergency Alert
            </h2>
            <p className="text-gray-600 text-sm">
              Contacting emergency services and notifying your contacts...
            </p>
          </div>
        )}

        {/* SENT STATE */}
        {sosState === "sent" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Emergency Alert Sent
            </h2>
            <p className="text-gray-600 text-sm">
              Help is on the way. Stay calm and stay safe.
            </p>
          </div>
        )}

        {/* WAITING STATE */}
        {sosState === "waiting" && (
          <>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Emergency Active
              </h3>
              <p className="text-sm text-gray-600">
                Help is on the way. Track responders below:
              </p>
            </div>

            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
              <div ref={sosMapContainer} className="w-full h-full" />
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-900">
                    Police
                  </span>
                </div>
                <p className="text-xs text-gray-600">6 min away</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-900">
                    Medical
                  </span>
                </div>
                <p className="text-xs text-gray-600">8 min away</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-900">
                    Contacts
                  </span>
                </div>
                <p className="text-xs text-gray-600">Notified</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SOSInterface;

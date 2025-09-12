// =============================================================================
// COMPONENT: Redesigned SOS Help Interface
// File path: src/components/sos/SOSInterface.tsx
// =============================================================================

import React, { useState } from "react";
import {
  Zap,
  MapPin,
  Phone,
  Users,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  UserX,
  Flame,
  ShieldAlert,
  Car,
  HeartHandshake,
  Plus,
  X,
  Camera,
  FileText,
  Send
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import type { SOSState } from "../../types";
import Header from "../layout/Header";

interface SOSInterfaceProps {
  sosState: SOSState;
  swipeProgress: number;
  currentLocation: string;
  onSwipeStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onClose: () => void;
  sosMapContainer: React.RefObject<HTMLDivElement>;
}

interface HelpRequest {
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  contactInfo: string;
  additionalInfo?: string;
}

const SOSInterface: React.FC<SOSInterfaceProps> = ({
  sosState,
  swipeProgress,
  currentLocation,
  onSwipeStart,
  onClose,
  sosMapContainer,
}) => {
  const { t } = useTranslation();
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({
    category: '',
    urgency: 'medium',
    title: '',
    description: '',
    location: currentLocation,
    contactInfo: '',
    additionalInfo: ''
  });

  const helpCategories = [
    {
      id: 'missing_person',
      title: 'Missing Person',
      description: 'Report a missing group member or individual',
      icon: UserX,
      color: 'bg-red-500',
      urgency: 'high' as const
    },
    {
      id: 'fire_emergency',
      title: 'Fire Emergency',
      description: 'Fire incident or smoke detection',
      icon: Flame,
      color: 'bg-orange-500',
      urgency: 'critical' as const
    },
    {
      id: 'theft_robbery',
      title: 'Theft/Robbery',
      description: 'Report stolen items or robbery incident',
      icon: ShieldAlert,
      color: 'bg-purple-500',
      urgency: 'high' as const
    },
    {
      id: 'accident',
      title: 'Accident',
      description: 'Traffic accident or injury incident',
      icon: Car,
      color: 'bg-blue-500',
      urgency: 'critical' as const
    },
    {
      id: 'medical_help',
      title: 'Medical Help',
      description: 'Non-emergency medical assistance',
      icon: HeartHandshake,
      color: 'bg-green-500',
      urgency: 'medium' as const
    },
    {
      id: 'general_help',
      title: 'General Help',
      description: 'Other assistance or information needed',
      icon: AlertTriangle,
      color: 'bg-gray-500',
      urgency: 'low' as const
    }
  ];

  const handleCategorySelect = (category: typeof helpCategories[0]) => {
    setSelectedCategory(category.id);
    setHelpRequest(prev => ({
      ...prev,
      category: category.id,
      title: category.title,
      urgency: category.urgency
    }));
    setShowHelpForm(true);
  };

  const handleSubmitHelp = () => {
    if (!helpRequest.description || !helpRequest.contactInfo) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate help request submission
    console.log('Help request submitted:', helpRequest);
    toast.success('Help request submitted successfully');
    setShowHelpForm(false);
    setHelpRequest({
      category: '',
      urgency: 'medium',
      title: '',
      description: '',
      location: currentLocation,
      contactInfo: '',
      additionalInfo: ''
    });
  };

  const handleInputChange = (field: keyof HelpRequest, value: string) => {
    setHelpRequest(prev => ({ ...prev, [field]: value }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (sosState === "inactive") return null;

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <Header title="Help"/>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 py-4">
        {!showHelpForm ? (
          <>
            {/* Help Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                What kind of help do you need?
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Select the category that best describes your situation
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {helpCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                    >
                      <div className="text-center">
                        <div className={`${category.color} p-3 rounded-xl mx-auto mb-3 group-hover:scale-110 transition-transform w-fit`}>
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight">
                          {category.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Location Info */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Your Current Location</h3>
                  <p className="text-sm text-gray-600">{currentLocation}</p>
                </div>
              </div>
            </div>

            {/* Recent Help Requests */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Recent Help Requests</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600" size={16} />
                    <div>
                      <p className="text-sm font-medium text-green-800">General Help</p>
                      <p className="text-xs text-green-600">Resolved - 2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No other recent requests</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Help Request Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`${helpCategories.find(c => c.id === selectedCategory)?.color} p-2 rounded-lg`}>
                  {React.createElement(helpCategories.find(c => c.id === selectedCategory)?.icon || AlertTriangle, { 
                    size: 20, 
                    className: "text-white" 
                  })}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{helpRequest.title}</h2>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(helpRequest.urgency)}`}>
                    {helpRequest.urgency.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    value={helpRequest.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low - Can wait for assistance</option>
                    <option value="medium">Medium - Need help soon</option>
                    <option value="high">High - Urgent assistance needed</option>
                    <option value="critical">Critical - Immediate help required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={helpRequest.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your situation in detail..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Contact Information *
                  </label>
                  <input
                    type="text"
                    value={helpRequest.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    placeholder="Phone number or best way to reach you"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={helpRequest.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={helpRequest.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any other relevant details..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                    <Camera size={18} />
                    <span>Add Photo</span>
                  </button>
                  <button className="flex-1 bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                    <FileText size={18} />
                    <span>Add Document</span>
                  </button>
                </div>

                <button
                  onClick={handleSubmitHelp}
                  className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Submit Help Request</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Emergency SOS Slider - Always at bottom */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-red-200">
          <div className="text-center mb-4">
            <h3 className="font-bold text-red-800 mb-1">CRITICAL EMERGENCY</h3>
            <p className="text-sm text-red-600">
              For life-threatening emergencies, slide to call emergency services immediately
            </p>
          </div>

          {/* SOS States */}
          {sosState === "swipe" && (
            <div className="relative h-16 bg-red-600 rounded-full flex items-center px-2 overflow-hidden">
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
                  <span className="text-white font-medium text-sm ml-8">
                    Slide to call 911
                  </span>
                </div>
              )}
              {swipeProgress >= 50 && swipeProgress < 90 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <span className="text-white font-medium text-sm">
                    Keep sliding for emergency...
                  </span>
                </div>
              )}
            </div>
          )}

          {sosState === "sending" && (
            <div className="text-center py-6">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-red-800 mb-2">
                Calling Emergency Services
              </h3>
              <p className="text-red-600 text-sm">
                Connecting you to emergency responders...
              </p>
            </div>
          )}

          {sosState === "sent" && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">
                Emergency Services Contacted
              </h3>
              <p className="text-green-600 text-sm">
                Help is on the way. Stay on the line.
              </p>
            </div>
          )}

          {sosState === "waiting" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-red-800 mb-2">Emergency Active</h3>
                <p className="text-sm text-red-600 mb-4">
                  Emergency responders are en route to your location
                </p>
              </div>

              <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg">
                <div ref={sosMapContainer} className="w-full h-full" />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">Police</span>
                  </div>
                  <p className="text-xs text-gray-600">6 min away</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">Medical</span>
                  </div>
                  <p className="text-xs text-gray-600">8 min away</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">Contacts</span>
                  </div>
                  <p className="text-xs text-gray-600">Notified</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSInterface;
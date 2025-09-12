// =============================================================================
// COMPONENT: Trip Details Screen
// File path: src/components/screens/TripDetailsScreen.tsx
// =============================================================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Users, Clock, Edit3, Share, Navigation, Star, Camera, FileText, CheckCircle } from 'lucide-react';
import Header from '../layout/Header';
import type { Trip } from '../../types/trip';

interface TripDetailsScreenProps {
  onBack: () => void;
  trip: Trip;
  onEditTrip?: (trip: Trip) => void;
}

// Mock trip data for demonstration
const mockTrip: Trip = {
  id: '1',
  name: 'Dubai Adventure 2024',
  destination: 'Dubai, UAE',
  description: 'Amazing 7-day adventure exploring Dubai with family and friends',
  startDate: '2024-12-20',
  endDate: '2024-12-27',
  members: [
    {
      id: '1',
      fullName: 'Alex Johnson',
      age: 32,
      documentType: 'passport',
      documentNumber: 'US123456789',
      phoneNumbers: ['+1-555-0123'],
      emergencyContact: 'Sarah Johnson - Spouse',
      specialNeeds: ''
    },
    {
      id: '2',
      fullName: 'Sarah Johnson',
      age: 30,
      documentType: 'passport',
      documentNumber: 'US987654321',
      phoneNumbers: ['+1-555-0124'],
      emergencyContact: 'Alex Johnson - Spouse',
      specialNeeds: ''
    },
    {
      id: '3',
      fullName: 'Emma Johnson',
      age: 8,
      documentType: 'passport',
      documentNumber: 'US456789123',
      phoneNumbers: [],
      emergencyContact: 'Alex Johnson - Father',
      specialNeeds: 'Vegetarian meals'
    }
  ],
  itinerary: [
    {
      day: 1,
      date: '2024-12-20',
      location: 'Dubai Marina',
      activities: ['Check-in at hotel', 'Marina Walk', 'Dinner at waterfront restaurant'],
      notes: 'Arrival day - take it easy'
    },
    {
      day: 2,
      date: '2024-12-21',
      location: 'Downtown Dubai',
      activities: ['Burj Khalifa visit', 'Dubai Mall shopping', 'Fountain show'],
      notes: 'Book Burj Khalifa tickets in advance'
    },
    {
      day: 3,
      date: '2024-12-22',
      location: 'Palm Jumeirah',
      activities: ['Atlantis Aquarium', 'Beach time', 'Monorail ride'],
      notes: 'Bring sunscreen and swimwear'
    }
  ],
  createdAt: '2024-12-01T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z'
};

const TripDetailsScreen: React.FC<TripDetailsScreenProps> = ({
  onBack,
  trip = mockTrip,
  onEditTrip
}) => {
  const { t, i18n } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'members' | 'itinerary'>('overview');

  const tripDuration = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleEdit = () => {
    if (onEditTrip) {
      onEditTrip(trip);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trip.name,
        text: `Check out my trip: ${trip.name} to ${trip.destination}`,
        url: window.location.href
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Header 
        title={trip.name}
        onBack={onBack}
        rightAction={
          <div className="flex space-x-2">
            <button 
              onClick={handleShare}
              className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Share size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={handleEdit}
              className="p-2 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
            >
              <Edit3 size={18} className="text-blue-600" />
            </button>
          </div>
        }
      />
      
      <div className="px-4 space-y-6">
        {/* Trip Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{trip.name}</h1>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin size={16} />
                  <span className="text-blue-100">{trip.destination}</span>
                </div>
                <p className="text-blue-100 text-sm">{trip.description}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Camera className="text-white" size={24} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <Calendar className="text-white mx-auto mb-1" size={20} />
                <p className="text-lg font-bold">{tripDuration}</p>
                <p className="text-xs text-blue-100">Days</p>
              </div>
              <div className="text-center">
                <Users className="text-white mx-auto mb-1" size={20} />
                <p className="text-lg font-bold">{trip.members.length}</p>
                <p className="text-xs text-blue-100">Members</p>
              </div>
              <div className="text-center">
                <Navigation className="text-white mx-auto mb-1" size={20} />
                <p className="text-lg font-bold">{trip.itinerary.length}</p>
                <p className="text-xs text-blue-100">Locations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-2xl p-1">
          {[
            { key: 'overview' as const, label: 'Overview', icon: FileText },
            { key: 'members' as const, label: 'Members', icon: Users },
            { key: 'itinerary' as const, label: 'Itinerary', icon: MapPin }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {/* Trip Dates */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Calendar className="text-blue-600" size={20} />
                <span>Travel Dates</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">{formatDate(trip.startDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Return:</span>
                  <span className="font-medium">{formatDate(trip.endDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{tripDuration} days</span>
                </div>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <Users className="text-purple-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">{trip.members.length}</p>
                <p className="text-sm text-gray-600">Travelers</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <MapPin className="text-green-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">{trip.itinerary.length}</p>
                <p className="text-sm text-gray-600">Destinations</p>
              </div>
            </div>

            {/* Important Documents */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-800 font-medium">All passports valid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-600" size={20} />
                    <span className="text-blue-800 font-medium">Travel insurance active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'members' && (
          <div className="space-y-4">
            {trip.members.map((member, index) => (
              <div key={member.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{member.fullName}</h3>
                    <p className="text-gray-600">Age: {member.age}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index === 0 && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Trip Leader
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document:</span>
                    <span className="font-medium">{member.documentType.toUpperCase()} - {member.documentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Contact:</span>
                    <span className="font-medium">{member.emergencyContact}</span>
                  </div>
                  {member.phoneNumbers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{member.phoneNumbers[0]}</span>
                    </div>
                  )}
                  {member.specialNeeds && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Special Needs:</span>
                      <span className="font-medium text-orange-600">{member.specialNeeds}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'itinerary' && (
          <div className="space-y-4">
            {trip.itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Day {day.day}</h3>
                    <p className="text-gray-600">{formatDate(day.date)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="text-blue-600" size={16} />
                    <span className="text-blue-600 font-medium">{day.location}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <h4 className="font-medium text-gray-800">Activities:</h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {day.notes && (
                  <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-start space-x-2">
                      <Star className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-yellow-800 text-sm">{day.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetailsScreen;
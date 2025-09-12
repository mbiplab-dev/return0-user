// =============================================================================
// COMPONENT: Add Trip Screen with API integration and i18n support
// File path: src/components/screens/AddTripScreen.tsx
// =============================================================================

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Save,
  X,
  Phone,
  CreditCard,
  UserPlus,
  Edit3,
  AlertCircle,
  Loader
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import Header from "../layout/Header";
import { tripService, useApiState } from "../../services/tripService";
import type { Trip, TripMember, PhoneNumber, TripItinerary } from "../../types/trip";

interface AddTripScreenProps {
  onBack: () => void;
  onSaveTrip: (trip: Trip) => void;
  userId: string; // Add userId prop
}

const AddTripScreen: React.FC<AddTripScreenProps> = ({ onBack, onSaveTrip, userId }) => {
  const { t } = useTranslation();
  const { loading, error, executeApiCall, setError } = useApiState();
  
  const [currentStep, setCurrentStep] = useState<'basic' | 'members' | 'itinerary'>('basic');
  const [tripId, setTripId] = useState<string | null>(null);
  
  // Basic info state
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  
  // Members state
  const [members, setMembers] = useState<TripMember[]>([]);
  const [itinerary, setItinerary] = useState<TripItinerary[]>([]);
  
  // Member form state
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TripMember | null>(null);
  const [memberForm, setMemberForm] = useState<Partial<TripMember>>({
    name: "",
    age: 18,
    documentType: "aadhar",
    documentNumber: "",
    phoneNumbers: [{ id: "1", number: "", type: "primary" }],
    speciallyAbled: false,
    specialNeeds: "",
    emergencyContact: "",
    relation: ""
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Step 1: Create basic trip
  const handleCreateTrip = async () => {
    if (!tripName || !destination || !startDate || !endDate) {
      toast.error(t('trip.fillRequiredFields'));
      return false;
    }

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error(t('trip.invalidDateRange'));
      return false;
    }

    const tripData = {
      tripName,
      destination,
      startDate,
      endDate,
      description,
      createdBy: userId
    };

    const result = await executeApiCall(() => tripService.createTrip(tripData));
    
    if (result) {
      setTripId(result.id);
      toast.success(t('success.tripCreated'));
      setCurrentStep('members');
      return true;
    } else {
      toast.error(error || t('error.tripCreationFailed'));
      return false;
    }
  };

  // Step 2: Add members to trip
  const handleAddMembers = async () => {
    if (!tripId) {
      toast.error(t('error.tripNotFound'));
      return false;
    }

    if (members.length === 0) {
      // Allow proceeding without members
      setCurrentStep('itinerary');
      return true;
    }

    const result = await executeApiCall(() => tripService.addMembers(tripId, members));
    
    if (result) {
      toast.success(t('success.membersAdded'));
      setCurrentStep('itinerary');
      return true;
    } else {
      toast.error(error || t('error.membersAddFailed'));
      return false;
    }
  };

  // Step 3: Add itinerary and complete trip
  const handleCompleteTrip = async () => {
    if (!tripId) {
      toast.error(t('error.tripNotFound'));
      return;
    }

    // Add itinerary if any exists
    if (itinerary.length > 0) {
      const result = await executeApiCall(() => tripService.addItinerary(tripId, itinerary));
      
      if (!result) {
        toast.error(error || t('error.itineraryAddFailed'));
        return;
      }
    }

    // Fetch the complete trip data
    const completeTrip = await executeApiCall(() => tripService.getTripById(tripId));
    
    if (completeTrip) {
      toast.success(t('success.tripSaved'));
      onSaveTrip(completeTrip);
      onBack();
    } else {
      toast.error(error || t('error.tripFetchFailed'));
    }
  };

  // Phone number management
  const addPhoneNumber = () => {
    const newPhone: PhoneNumber = {
      id: generateId(),
      number: "",
      type: "other"
    };
    setMemberForm({
      ...memberForm,
      phoneNumbers: [...(memberForm.phoneNumbers || []), newPhone]
    });
  };

  const updatePhoneNumber = (id: string, field: keyof PhoneNumber, value: string) => {
    setMemberForm({
      ...memberForm,
      phoneNumbers: memberForm.phoneNumbers?.map(phone =>
        phone.id === id ? { ...phone, [field]: value } : phone
      )
    });
  };

  const removePhoneNumber = (id: string) => {
    setMemberForm({
      ...memberForm,
      phoneNumbers: memberForm.phoneNumbers?.filter(phone => phone.id !== id)
    });
  };

  // Member management
  const saveMember = () => {
    if (!memberForm.name || !memberForm.documentNumber) {
      toast.error(t('trip.fillRequiredFields'));
      return;
    }

    // Validate phone numbers
    const validPhones = memberForm.phoneNumbers?.filter(phone => phone.number.trim()) || [];
    if (validPhones.length === 0) {
      toast.error(t('trip.atLeastOnePhone'));
      return;
    }

    const newMember: TripMember = {
      id: editingMember?.id || generateId(),
      name: memberForm.name!,
      age: memberForm.age || 18,
      documentType: memberForm.documentType!,
      documentNumber: memberForm.documentNumber!,
      phoneNumbers: validPhones,
      speciallyAbled: memberForm.speciallyAbled || false,
      specialNeeds: memberForm.specialNeeds,
      emergencyContact: memberForm.emergencyContact,
      relation: memberForm.relation
    };

    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? newMember : m));
      toast.success(t('success.memberUpdated'));
    } else {
      setMembers([...members, newMember]);
      toast.success(t('success.memberAdded'));
    }

    resetMemberForm();
  };

  const resetMemberForm = () => {
    setMemberForm({
      name: "",
      age: 18,
      documentType: "aadhar",
      documentNumber: "",
      phoneNumbers: [{ id: generateId(), number: "", type: "primary" }],
      speciallyAbled: false,
      specialNeeds: "",
      emergencyContact: "",
      relation: ""
    });
    setShowAddMember(false);
    setEditingMember(null);
  };

  const editMember = (member: TripMember) => {
    setMemberForm(member);
    setEditingMember(member);
    setShowAddMember(true);
  };

  const removeMember = (id: string) => {
    if (confirm(t('trip.deleteConfirm'))) {
      setMembers(members.filter(m => m.id !== id));
      toast.success(t('success.memberDeleted'));
    }
  };

  // Itinerary management
  const addItineraryDay = () => {
    const newDay: TripItinerary = {
      id: generateId(),
      date: "",
      location: "",
      activities: [""],
      notes: ""
    };
    setItinerary([...itinerary, newDay]);
  };

  const updateItinerary = (id: string, field: keyof TripItinerary, value: any) => {
    setItinerary(itinerary.map(day =>
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  const removeItineraryDay = (id: string) => {
    if (confirm(t('trip.deleteDay'))) {
      setItinerary(itinerary.filter(day => day.id !== id));
    }
  };

  const addActivity = (dayId: string) => {
    setItinerary(itinerary.map(day =>
      day.id === dayId ? { ...day, activities: [...day.activities, ""] } : day
    ));
  };

  const updateActivity = (dayId: string, activityIndex: number, value: string) => {
    setItinerary(itinerary.map(day =>
      day.id === dayId ? {
        ...day,
        activities: day.activities.map((activity, index) =>
          index === activityIndex ? value : activity
        )
      } : day
    ));
  };

  const removeActivity = (dayId: string, activityIndex: number) => {
    setItinerary(itinerary.map(day =>
      day.id === dayId ? {
        ...day,
        activities: day.activities.filter((_, index) => index !== activityIndex)
      } : day
    ));
  };

  // Error display component
  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
      <AlertCircle size={16} className="text-red-500" />
      <span className="text-sm text-red-700">{message}</span>
      <button
        onClick={() => setError(null)}
        className="ml-auto text-red-400 hover:text-red-600"
      >
        <X size={14} />
      </button>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6 px-4">
      <div className="flex items-center space-x-2 pt-2 px-2">
        {[
          { key: 'basic', labelKey: 'trip.stepIndicator.step1' },
          { key: 'members', labelKey: 'trip.stepIndicator.step2' },
          { key: 'itinerary', labelKey: 'trip.stepIndicator.step3' }
        ].map((step, index) => (
          <React.Fragment key={step.key}>
            <button
              onClick={() => {
                // Only allow going back to completed steps
                if (step.key === 'basic' || (step.key === 'members' && tripId)) {
                  setCurrentStep(step.key as any);
                }
              }}
              disabled={step.key === 'members' && !tripId}
              className={`flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentStep === step.key
                  ? 'bg-blue-600 text-white'
                  : tripId || step.key === 'basic'
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === step.key ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-600'
              }`}>
                {index + 1}
              </span>
              <span>{t(step.labelKey)}</span>
            </button>
            {index < 2 && <div className="w-8 h-px bg-gray-300" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="px-4 space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-600" size={20} />
          {t('trip.tripDetails')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('trip.tripName')} *
            </label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder={t('trip.tripNamePlaceholder')}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('trip.destination')} *
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t('trip.destinationPlaceholder')}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.startDate')} *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.endDate')} *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('trip.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('trip.descriptionPlaceholder')}
              rows={3}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        <button
          onClick={handleCreateTrip}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading && <Loader size={16} className="animate-spin" />}
          <span>{loading ? t('common.saving') : t('trip.continueToMembers')}</span>
        </button>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="px-4 space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 text-purple-600" size={20} />
            {t('trip.tripMembers')} ({t('trip.memberCount', { count: members.length })})
          </h3>
          <button
            onClick={() => setShowAddMember(true)}
            disabled={loading}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            <UserPlus size={16} />
            <span>{t('trip.addMember')}</span>
          </button>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users size={48} className="mx-auto mb-2 text-gray-300" />
            <p>{t('trip.noMembersYet')}</p>
            <p className="text-sm">{t('trip.addTravelers')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">
                      {t('trip.age')}: {member.age} • {member.documentType.toUpperCase()}: {member.documentNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.phoneNumbers.length} {t('trip.phoneNumbers').toLowerCase()}
                      {member.speciallyAbled && ` • ${t('trip.speciallyAbled')}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editMember(member)}
                      disabled={loading}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:text-gray-300"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => removeMember(member.id)}
                      disabled={loading}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:text-gray-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setCurrentStep('basic')}
            disabled={loading}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {t('common.back')}
          </button>
          <button
            onClick={handleAddMembers}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading && <Loader size={16} className="animate-spin" />}
            <span>{loading ? t('common.saving') : t('trip.continueToItinerary')}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddMemberModal = () => {
    if (!showAddMember) return null;

    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
        <div className="bg-white rounded-t-3xl w-full max-w-sm h-full overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingMember ? t('trip.editMember') : t('trip.addMember')}
              </h3>
              <button
                onClick={resetMemberForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.fullName')} *
              </label>
              <input
                type="text"
                value={memberForm.name || ""}
                onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                placeholder={t('trip.fullNamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.age')} *
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={memberForm.age || 18}
                onChange={(e) => setMemberForm({ ...memberForm, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.documentType')} *
              </label>
              <select
                value={memberForm.documentType || "aadhar"}
                onChange={(e) => setMemberForm({ ...memberForm, documentType: e.target.value as 'aadhar' | 'passport' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="aadhar">{t('trip.aadharCard')}</option>
                <option value="passport">{t('trip.passport')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.documentNumber')} *
              </label>
              <input
                type="text"
                value={memberForm.documentNumber || ""}
                onChange={(e) => setMemberForm({ ...memberForm, documentNumber: e.target.value })}
                placeholder={memberForm.documentType === 'aadhar' ? t('trip.aadharPlaceholder') : t('trip.passportPlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('trip.phoneNumbers')} *
                </label>
                <button
                  onClick={addPhoneNumber}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  {t('trip.addPhone')}
                </button>
              </div>
              <div className="space-y-2">
                {memberForm.phoneNumbers?.map((phone, index) => (
                  <div key={phone.id} className="flex space-x-2">
                    <input
                      type="tel"
                      value={phone.number}
                      onChange={(e) => updatePhoneNumber(phone.id, 'number', e.target.value)}
                      placeholder={t('common.phone')}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <select
                      value={phone.type}
                      onChange={(e) => updatePhoneNumber(phone.id, 'type', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      <option value="primary">{t('trip.phoneType.primary')}</option>
                      <option value="emergency">{t('trip.phoneType.emergency')}</option>
                      <option value="other">{t('trip.phoneType.other')}</option>
                    </select>
                    {memberForm.phoneNumbers!.length > 1 && (
                      <button
                        onClick={() => removePhoneNumber(phone.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={memberForm.speciallyAbled || false}
                  onChange={(e) => setMemberForm({ ...memberForm, speciallyAbled: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">{t('trip.speciallyAbled')}</span>
              </label>
            </div>

            {memberForm.speciallyAbled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('trip.specialNeeds')}
                </label>
                <textarea
                  value={memberForm.specialNeeds || ""}
                  onChange={(e) => setMemberForm({ ...memberForm, specialNeeds: e.target.value })}
                  placeholder={t('trip.specialNeedsPlaceholder')}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.emergencyContactName')}
              </label>
              <input
                type="text"
                value={memberForm.emergencyContact || ""}
                onChange={(e) => setMemberForm({ ...memberForm, emergencyContact: e.target.value })}
                placeholder={t('trip.emergencyContactPlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('trip.relationship')}
              </label>
              <input
                type="text"
                value={memberForm.relation || ""}
                onChange={(e) => setMemberForm({ ...memberForm, relation: e.target.value })}
                placeholder={t('trip.relationshipPlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={saveMember}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors mt-6"
            >
              {editingMember ? t('trip.updateMember') : t('trip.addMember')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderItinerary = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('trip.tripItinerary')}</h3>
        <button
          onClick={addItineraryDay}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          <span>{t('trip.addDay')}</span>
        </button>
      </div>

      <div className="mb-6">
        {itinerary.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">{t('trip.noItineraryYet')}</h3>
            <p className="text-sm text-gray-500">{t('trip.planDailyActivities')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <div key={day.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{t('trip.day')} {index + 1}</h4>
                  <button
                    onClick={() => removeItineraryDay(day.id)}
                    disabled={loading}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:text-gray-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={day.date}
                      onChange={(e) => updateItinerary(day.id, 'date', e.target.value)}
                      min={startDate}
                      max={endDate}
                      disabled={loading}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm disabled:bg-gray-50"
                    />
                    <input
                      type="text"
                      value={day.location}
                      onChange={(e) => updateItinerary(day.id, 'location', e.target.value)}
                      placeholder={t('common.location')}
                      disabled={loading}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">{t('trip.activities')}</label>
                      <button
                        onClick={() => addActivity(day.id)}
                        disabled={loading}
                        className="text-green-600 hover:text-green-700 text-sm font-medium disabled:text-green-400"
                      >
                        {t('trip.addActivity')}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex space-x-2">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => updateActivity(day.id, activityIndex, e.target.value)}
                            placeholder={t('trip.activityPlaceholder')}
                            disabled={loading}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm disabled:bg-gray-50"
                          />
                          {day.activities.length > 1 && (
                            <button
                              onClick={() => removeActivity(day.id, activityIndex)}
                              disabled={loading}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:text-red-300"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={day.notes || ""}
                    onChange={(e) => updateItinerary(day.id, 'notes', e.target.value)}
                    placeholder={t('trip.additionalNotes')}
                    rows={2}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm disabled:bg-gray-50"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setCurrentStep('members')}
            disabled={loading}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {t('common.back')}
          </button>
          <button
            onClick={handleCompleteTrip}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading && <Loader size={16} className="animate-spin" />}
            <Save size={16} />
            <span>{loading ? t('common.saving') : t('trip.saveTrip')}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-50">
      <Header
        title={t('trip.addNewTrip')}
        showBack
        onBack={onBack}
        rightAction={
          currentStep === 'itinerary' ? (
            <button
              onClick={handleCompleteTrip}
              disabled={loading}
              className="text-sm text-blue-600 font-medium disabled:text-blue-400"
            >
              {loading ? t('common.saving') : t('common.save')}
            </button>
          ) : null
        }
      />

      {renderStepIndicator()}

      {error && <ErrorMessage message={error} />}

      <div className="pb-6">
        {currentStep === 'basic' && renderBasicInfo()}
        {currentStep === 'members' && renderMembers()}
        {currentStep === 'itinerary' && renderItinerary()}
      </div>

      {renderAddMemberModal()}
    </div>
  );
};

export default AddTripScreen;
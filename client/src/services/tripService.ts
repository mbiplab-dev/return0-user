// =============================================================================
// API Service for Trip Management
// File path: src/services/tripService.ts
// =============================================================================

import axios from 'axios';
import type { Trip, TripMember, TripItinerary } from '../types/trip';
import { useState } from 'react';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Types for API requests
interface CreateTripRequest {
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
  createdBy: string;
}

interface AddMembersRequest {
  members: TripMember[];
}

interface AddItineraryRequest {
  itinerary: TripItinerary[];
}

// Trip API Service
export const tripService = {
  // Step 1: Create basic trip
  async createTrip(tripData: CreateTripRequest): Promise<Trip> {
    const response = await apiClient.post('/trips', tripData);
    return response.data;
  },

  // Step 2: Add members to trip
  async addMembers(tripId: string, members: TripMember[]): Promise<Trip> {
    const response = await apiClient.post(`/trips/${tripId}/members`, { members });
    return response.data;
  },

  // Step 3: Add itinerary to trip
  async addItinerary(tripId: string, itinerary: TripItinerary[]): Promise<Trip> {
    const response = await apiClient.post(`/trips/${tripId}/itinerary`, { itinerary });
    return response.data;
  },

  // Get all trips for a user
  async getAllTrips(userId: string): Promise<Trip[]> {
    const response = await apiClient.get(`/trips/${userId}`);
    return response.data;
  },

  // Get single trip by ID
  async getTripById(tripId: string): Promise<Trip> {
    const response = await apiClient.get(`/trips/single/${tripId}`);
    return response.data;
  },

  // Update trip basic info
  async updateTrip(tripId: string, tripData: Partial<CreateTripRequest>): Promise<Trip> {
    const response = await apiClient.put(`/trips/${tripId}`, tripData);
    return response.data;
  },

  // Delete trip
  async deleteTrip(tripId: string): Promise<void> {
    await apiClient.delete(`/trips/${tripId}`);
  },

  // Update specific member
  async updateMember(tripId: string, memberId: string, memberData: TripMember): Promise<Trip> {
    const response = await apiClient.put(`/trips/${tripId}/members/${memberId}`, memberData);
    return response.data;
  },

  // Remove member from trip
  async removeMember(tripId: string, memberId: string): Promise<Trip> {
    const response = await apiClient.delete(`/trips/${tripId}/members/${memberId}`);
    return response.data;
  },

  // Update specific itinerary day
  async updateItineraryDay(tripId: string, dayId: string, dayData: TripItinerary): Promise<Trip> {
    const response = await apiClient.put(`/trips/${tripId}/itinerary/${dayId}`, dayData);
    return response.data;
  },

  // Remove itinerary day
  async removeItineraryDay(tripId: string, dayId: string): Promise<Trip> {
    const response = await apiClient.delete(`/trips/${tripId}/itinerary/${dayId}`);
    return response.data;
  }
};

// Hook for handling API loading states and errors
export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeApiCall = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeApiCall, setError };
};
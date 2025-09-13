// =============================================================================
// NOTIFICATION SERVICE (Frontend)
// File path: src/services/notificationService.ts
// =============================================================================

import authService from './authService';

const API_BASE_URL = 'http://localhost:5000/api/notifications';

// Types and Interfaces
interface Location {
  type?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  address?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  category: string;
  priority: string;
  hazardType?: string;
  location?: Location;
  relatedId?: string;
  relatedType?: string;
  isRead: boolean;
  readAt?: string;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
  deliveryStatus: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt: string;
  // For frontend display
  time?: string;
}

interface NotificationsResponse {
  message: string;
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface UnreadCountResponse {
  message: string;
  count: number;
}

interface NotificationStatsResponse {
  message: string;
  stats: {
    total: number;
    unread: number;
    read: number;
    byType: Array<{ _id: string; count: number }>;
    byPriority: Array<{ _id: string; count: number }>;
  };
}

interface CreateNotificationData {
  userId: string;
  title: string;
  message: string;
  type?: string;
  category?: string;
  priority?: string;
  hazardType?: string;
  location?: Location;
  relatedId?: string;
  relatedType?: string;
  actionRequired?: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

interface CreateHazardNotificationData {
  userId: string;
  hazardType: string;
  title?: string;
  message: string;
  location?: Location;
  priority?: string;
  metadata?: Record<string, any>;
}

interface GetNotificationsOptions {
  page?: number;
  limit?: number;
  type?: string;
  category?: string;
  isRead?: boolean;
  priority?: string;
  includeExpired?: boolean;
}

class NotificationService {
  // Helper method to handle API responses
  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    return data;
  }

  // Format time for display
  private formatNotificationTime(notification: Notification): Notification {
    const now = new Date();
    const createdAt = new Date(notification.createdAt);
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
    
    let timeString = '';
    if (diffInMinutes < 1) {
      timeString = 'just now';
    } else if (diffInMinutes < 60) {
      timeString = `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      timeString = `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      timeString = `${days}d ago`;
    }

    return {
      ...notification,
      time: timeString
    };
  }

  // Get user notifications with filters and pagination
  async getUserNotifications(options: GetNotificationsOptions = {}): Promise<NotificationsResponse> {
    try {
      const params = new URLSearchParams();
      
      if (options.page) params.append('page', options.page.toString());
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.type) params.append('type', options.type);
      if (options.category) params.append('category', options.category);
      if (options.isRead !== undefined) params.append('isRead', options.isRead.toString());
      if (options.priority) params.append('priority', options.priority);
      if (options.includeExpired) params.append('includeExpired', 'true');

      const response = await authService.apiRequest(`/notifications?${params.toString()}`, {
        method: 'GET',
      });

      const result = await this.handleResponse<NotificationsResponse>(response);

      // Format time for each notification
      result.notifications = result.notifications.map(notification => 
        this.formatNotificationTime(notification)
      );

      return result;
    } catch (error) {
      console.error('Get notifications error:', error);
      throw error;
    }
  }

  // Get unread notification count
  async getUnreadCount(): Promise<number> {
    try {
      const response = await authService.apiRequest('/notifications/unread-count', {
        method: 'GET',
      });

      const result = await this.handleResponse<UnreadCountResponse>(response);
      return result.count;
    } catch (error) {
      console.error('Get unread count error:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const response = await authService.apiRequest(`/notifications/${notificationId}/read`, {
        method: 'PATCH',
      });

      const result = await this.handleResponse<{ message: string; notification: Notification }>(response);
      return result.notification;
    } catch (error) {
      console.error('Mark as read error:', error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    try {
      await authService.apiRequest('/notifications/mark-all-read', {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Mark all as read error:', error);
      throw error;
    }
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await authService.apiRequest(`/notifications/${notificationId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Delete notification error:', error);
      throw error;
    }
  }

  // Create notification
  async createNotification(data: CreateNotificationData): Promise<Notification> {
    try {
      const response = await authService.apiRequest('/notifications', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<{ message: string; notification: Notification }>(response);
      return result.notification;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error;
    }
  }

  // Create hazard notification
  async createHazardNotification(data: CreateHazardNotificationData): Promise<Notification> {
    try {
      const response = await authService.apiRequest('/notifications/hazard', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<{ message: string; notification: Notification }>(response);
      return result.notification;
    } catch (error) {
      console.error('Create hazard notification error:', error);
      throw error;
    }
  }

  // Create bulk hazard notifications
  async createBulkHazardNotifications(data: {
    userIds: string[];
    hazardType: string;
    title?: string;
    message: string;
    location?: Location;
    priority?: string;
    metadata?: Record<string, any>;
  }): Promise<{ created: number; errors: number; notifications: Notification[] }> {
    try {
      const response = await authService.apiRequest('/notifications/hazard/bulk', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<{
        message: string;
        created: number;
        errors: number;
        notifications: Notification[];
        errors: any[];
      }>(response);

      return {
        created: result.created,
        errors: result.errors,
        notifications: result.notifications
      };
    } catch (error) {
      console.error('Create bulk hazard notifications error:', error);
      throw error;
    }
  }

  // Get notification statistics
  async getNotificationStats(): Promise<NotificationStatsResponse['stats']> {
    try {
      const response = await authService.apiRequest('/notifications/stats', {
        method: 'GET',
      });

      const result = await this.handleResponse<NotificationStatsResponse>(response);
      return result.stats;
    } catch (error) {
      console.error('Get notification stats error:', error);
      throw error;
    }
  }

  // Helper method to create hazard notification for current user
  async createHazardNotificationForCurrentUser(hazardData: {
    hazardType: string;
    title?: string;
    message: string;
    location?: Location;
    priority?: string;
    metadata?: Record<string, any>;
  }): Promise<Notification | null> {
    try {
      const currentUser = authService.getUser();
      if (!currentUser) {
        console.warn('No current user found, cannot create notification');
        return null;
      }

      return await this.createHazardNotification({
        userId: currentUser.id,
        ...hazardData
      });
    } catch (error) {
      console.error('Create hazard notification for current user error:', error);
      throw error;
    }
  }

  // Method to handle map hazard alerts (for integration with MapScreen)
  async handleMapHazardAlert(hazardType: string, message: string, location?: Location): Promise<void> {
    try {
      await this.createHazardNotificationForCurrentUser({
        hazardType,
        message,
        location,
        priority: hazardType === 'emergency' ? 'critical' : 'high',
        metadata: {
          source: 'map_interaction',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Handle map hazard alert error:', error);
      // Don't throw - this shouldn't break the map functionality
    }
  }
}

// Create and export a singleton instance
const notificationService = new NotificationService();
export default notificationService;

// Export types
export type {
  Location,
  NotificationsResponse,
  UnreadCountResponse,
  NotificationStatsResponse,
  CreateNotificationData,
  CreateHazardNotificationData,
  GetNotificationsOptions
};
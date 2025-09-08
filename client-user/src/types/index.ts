// Types and Interfaces
export interface Notification {
  id: number;
  type: "warning" | "info" | "success" | "emergency" | "health";
  message: string;
  time: string;
  priority: "low" | "medium" | "high" | "critical";
}

export interface GroupMember {
  id: number;
  name: string;
  status: "safe" | "warning" | "danger";
  lastSeen: string;
  location: string;
  avatar?: string;
}

export type SOSState = "inactive" | "swipe" | "sending" | "sent" | "waiting";
export type ActiveTab = "home" | "map" | "notifications" | "profile" | "SOS";


export interface GroupMemberItemProps {
  member: GroupMember;
  showLocation?: boolean;
}
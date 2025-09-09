import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BottomNavigation from "./components/navigation/BottomNavigation";
import HomeScreen from "./components/screens/HomeScreen";
import MapScreen from "./components/screens/MapScreen";
import NotificationScreen from "./components/screens/NotificationScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import SOSInterface from "./components/sos/SosInterface";
import type { ActiveTab, SOSState, GroupMember, Notification } from "./types";

// Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

// =============================================================================
// MAIN APP COMPONENT
// File path: src/App.tsx
// =============================================================================

const SmartTouristApp: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [sosState, setSosState] = useState<SOSState>("inactive");
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  // App data
  const [currentLocation] = useState("Dubai Marina, UAE");
  const [safetyScore] = useState(85);

  // Map refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const sosMapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const sosMapRef = useRef<mapboxgl.Map | null>(null);

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "warning",
      message: "Approaching unsafe area - Old Town District",
      time: "2 min ago",
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      message: "Group member Sarah checked in safely at Burj Khalifa",
      time: "5 min ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "success",
      message: "Welcome to Dubai! Safety protocols activated",
      time: "1 hour ago",
      priority: "low",
    },
    {
      id: 4,
      type: "emergency",
      message: "Emergency contact updated successfully",
      time: "2 hours ago",
      priority: "medium",
    },
    {
      id: 5,
      type: "health",
      message: "Heart rate elevated - take a break",
      time: "3 hours ago",
      priority: "high",
    },
  ]);

  const [groupMembers] = useState<GroupMember[]>([
    {
      id: 1,
      name: "Sarah Chen",
      status: "safe",
      lastSeen: "2 min ago",
      location: "Burj Khalifa",
    },
    {
      id: 2,
      name: "Mike Johnson",
      status: "safe",
      lastSeen: "5 min ago",
      location: "Dubai Mall",
    },
    {
      id: 3,
      name: "Lisa Park",
      status: "warning",
      lastSeen: "15 min ago",
      location: "Unknown",
    },
    {
      id: 4,
      name: "David Kim",
      status: "safe",
      lastSeen: "1 min ago",
      location: "Dubai Marina",
    },
  ]);

  // Map initialization
  useEffect(() => {
    if (activeTab !== "map" || !mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [55.2708, 25.2048],
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Add user marker
    new mapboxgl.Marker({ color: "#000000" })
      .setLngLat([55.2708, 25.2048])
      .addTo(mapRef.current);

    // Add group member markers
    groupMembers.forEach((member, index) => {
      const coords: [number, number] = [
        55.2708 + (Math.random() - 0.5) * 0.02,
        25.2048 + (Math.random() - 0.5) * 0.02,
      ];

      const color =
        member.status === "safe"
          ? "#22c55e"
          : member.status === "warning"
          ? "#f59e0b"
          : "#ef4444";

      new mapboxgl.Marker({ color })
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${member.name}</h3>
            <p class="text-sm text-gray-600">${member.location}</p>
            <p class="text-xs text-gray-500">${member.lastSeen}</p>
          </div>
        `)
        )
        .addTo(mapRef.current!);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab, groupMembers]);

  // SOS Map initialization
  useEffect(() => {
    if (sosState !== "waiting") {
      if (sosMapRef.current) {
        sosMapRef.current.remove();
        sosMapRef.current = null;
      }
      return;
    }

    if (!sosMapContainer.current || sosMapRef.current) return;

    sosMapRef.current = new mapboxgl.Map({
      container: sosMapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [55.2708, 25.2048],
      zoom: 15,
    });

    sosMapRef.current.on("load", () => {
      if (!sosMapRef.current) return;

      // Add user location marker
      new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([55.2708, 25.2048])
        .addTo(sosMapRef.current!);

      // Add emergency vehicle markers
      new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat([55.2758, 25.2098])
        .addTo(sosMapRef.current!);

      new mapboxgl.Marker({ color: "#22c55e" })
        .setLngLat([55.2658, 25.1998])
        .addTo(sosMapRef.current!);
    });
  }, [sosState]);

  // SOS handlers
  const handleSOSPress = () => {
    setSosState("swipe");
    setSwipeProgress(0);
  };

  const handleSwipeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleSwipeMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    const maxWidth = 280; // Max swipe distance
    const progress = Math.max(0, Math.min(100, (deltaX / maxWidth) * 100));

    setSwipeProgress(progress);

    if (progress >= 90) {
      handleSwipeComplete();
    }
  };

  const handleSwipeEnd = () => {
    setIsDragging(false);
    if (swipeProgress < 90) {
      setSwipeProgress(0);
    }
  };

  const handleSwipeComplete = () => {
    setSosState("sending");
    setSwipeProgress(100);
    setIsDragging(false);

    setTimeout(() => {
      setSosState("sent");
    }, 2000);

    setTimeout(() => {
      setSosState("waiting");
    }, 4000);
  };

  // Global swipe event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => handleSwipeMove(e);
      const handleEnd = () => handleSwipeEnd();

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, dragStartX]);

  const closeSOS = () => {
    setSosState("inactive");
    setSwipeProgress(0);
    setIsDragging(false);

    if (sosMapRef.current) {
      sosMapRef.current.remove();
      sosMapRef.current = null;
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            currentLocation={currentLocation}
            safetyScore={safetyScore}
            groupMembers={groupMembers}
            notifications={notifications}
          />
        );
      case "map":
        return (
          <MapScreen groupMembers={groupMembers} mapContainer={mapContainer} />
        );
      case "notifications":
        return <NotificationScreen notifications={notifications} />;
      case "profile":
        return <ProfileScreen />;
      case "SOS":
        return (
          <SOSInterface
            sosState={sosState}
            swipeProgress={swipeProgress}
            currentLocation={currentLocation}
            onSwipeStart={handleSwipeStart}
            onClose={closeSOS}
            sosMapContainer={sosMapContainer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen relative">
      <div className="pb-20">{renderScreen()}</div>
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSOSPress={handleSOSPress}
        notificationCount={
          notifications.filter((n) => n.priority === "high").length
        }
        sosState={sosState}
      />
    </div>
  );
};

export default SmartTouristApp;

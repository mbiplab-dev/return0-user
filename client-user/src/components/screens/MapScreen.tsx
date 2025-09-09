// =============================================================================
// COMPONENT: Map Screen
// File path: src/screens/MapScreen.tsx
// =============================================================================

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

import { AlertTriangle, Locate, Navigation, Search, Users } from "lucide-react";
import GroupMemberItem from "../common/GroupMemberItem";
import Header from "../layout/Header";
import type { GroupMember } from "../../types";
import { toast } from "react-hot-toast";

interface MapScreenProps {
  groupMembers: GroupMember[];
}

const MapScreen: React.FC<MapScreenProps> = ({ groupMembers }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const geojsonDataRef = useRef<any>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

    // ✅ Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [92.9376, 26.2006], // Assam
      zoom: 6,
    });

    mapRef.current.on("load", async () => {
      // ✅ Load restricted areas
      const response = await fetch("/data.json");
      const geojson = await response.json();
      geojsonDataRef.current = geojson;

      // Add polygons
      mapRef.current!.addSource("restricted-areas", {
        type: "geojson",
        data: geojson,
      });

      mapRef.current!.addLayer({
        id: "restricted-fill",
        type: "fill",
        source: "restricted-areas",
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      });

      mapRef.current!.addLayer({
        id: "restricted-outline",
        type: "line",
        source: "restricted-areas",
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });

      // ✅ Draggable marker
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([92.9376, 26.2006])
        .addTo(mapRef.current!);

      markerRef.current.on("dragend", () => {
        const lngLat = markerRef.current!.getLngLat();
        const point = turf.point([lngLat.lng, lngLat.lat]);

        let found = false;
        geojsonDataRef.current.features.forEach((feature: any) => {
          if (turf.booleanPointInPolygon(point, feature)) {
             toast.error(
              `🚨 Marker dropped in restricted area: ${feature.properties.name || "Unnamed"}`
            );
            found = true;
          }
        });

        if (!found) {
          toast.success("✅ Marker is in a safe zone");
        }
      });
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
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
            <button
              className="text-sm font-medium text-blue-600"
              onClick={() => {
                if (mapRef.current && markerRef.current) {
                  mapRef.current.flyTo({
                    center: markerRef.current.getLngLat(),
                    zoom: 7,
                  });
                }
              }}
            >
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
};

export default MapScreen;

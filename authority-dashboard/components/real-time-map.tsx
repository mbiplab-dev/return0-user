"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Users, AlertTriangle, Shield, Eye, Layers, Zap, Navigation } from "lucide-react"

interface TouristLocation {
  id: string
  lat: number
  lng: number
  name: string
  status: "safe" | "warning" | "danger"
  lastSeen: string
  groupSize: number
}

interface SafetyZone {
  id: string
  name: string
  type: "safe" | "high-risk"
  coordinates: { lat: number; lng: number }[]
  description: string
}

export function RealTimeMap() {
  const [heatmapEnabled, setHeatmapEnabled] = useState(false)
  const [showSafetyZones, setShowSafetyZones] = useState(true)
  const [showTouristClusters, setShowTouristClusters] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<TouristLocation | null>(null)

  // Mock tourist locations data
  const [touristLocations, setTouristLocations] = useState<TouristLocation[]>([
    {
      id: "T001",
      lat: 13.0827,
      lng: 80.2707,
      name: "Marina Beach Group",
      status: "safe",
      lastSeen: "2 min ago",
      groupSize: 12,
    },
    {
      id: "T002",
      lat: 13.0878,
      lng: 80.2785,
      name: "Fort St. George Visitors",
      status: "safe",
      lastSeen: "5 min ago",
      groupSize: 8,
    },
    {
      id: "T003",
      lat: 13.0732,
      lng: 80.2609,
      name: "Kapaleeshwarar Temple",
      status: "warning",
      lastSeen: "1 min ago",
      groupSize: 15,
    },
    {
      id: "T004",
      lat: 13.0569,
      lng: 80.2427,
      name: "Besant Nagar Beach",
      status: "danger",
      lastSeen: "Just now",
      groupSize: 3,
    },
    {
      id: "T005",
      lat: 13.0475,
      lng: 80.2824,
      name: "Guindy National Park",
      status: "safe",
      lastSeen: "8 min ago",
      groupSize: 6,
    },
  ])

  // Mock safety zones
  const safetyZones: SafetyZone[] = [
    {
      id: "SZ001",
      name: "Marina Beach Safe Zone",
      type: "safe",
      coordinates: [
        { lat: 13.0827, lng: 80.2707 },
        { lat: 13.085, lng: 80.275 },
        { lat: 13.08, lng: 80.275 },
      ],
      description: "Well-patrolled tourist area with security presence",
    },
    {
      id: "RZ001",
      name: "Crowded Market Area",
      type: "high-risk",
      coordinates: [
        { lat: 13.0732, lng: 80.2609 },
        { lat: 13.075, lng: 80.263 },
        { lat: 13.071, lng: 80.263 },
      ],
      description: "High pickpocket activity reported",
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTouristLocations((prev) =>
        prev.map((location) => ({
          ...location,
          lat: location.lat + (Math.random() - 0.5) * 0.001,
          lng: location.lng + (Math.random() - 0.5) * 0.001,
          lastSeen: Math.random() > 0.7 ? "Just now" : location.lastSeen,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "safe":
        return "default"
      case "warning":
        return "secondary"
      case "danger":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Map Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="heatmap" checked={heatmapEnabled} onCheckedChange={setHeatmapEnabled} />
              <Label htmlFor="heatmap" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Tourist Density Heatmap
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="safety-zones" checked={showSafetyZones} onCheckedChange={setShowSafetyZones} />
              <Label htmlFor="safety-zones" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Safety Zones
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="clusters" checked={showTouristClusters} onCheckedChange={setShowTouristClusters} />
              <Label htmlFor="clusters" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tourist Clusters
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Live Tourist Safety Map
            <Badge variant="secondary" className="ml-auto">
              <Eye className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-border overflow-hidden">
            {/* Map Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-400" />
                ))}
              </div>
            </div>

            {/* Safety Zones */}
            {showSafetyZones &&
              safetyZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`absolute rounded-full opacity-30 ${zone.type === "safe" ? "bg-green-400" : "bg-red-400"}`}
                  style={{
                    left: `${((zone.coordinates[0].lng - 80.24) / 0.04) * 100}%`,
                    top: `${((13.09 - zone.coordinates[0].lat) / 0.04) * 100}%`,
                    width: "80px",
                    height: "80px",
                  }}
                />
              ))}

            {/* Heatmap Overlay */}
            {heatmapEnabled && (
              <div className="absolute inset-0">
                {touristLocations.map((location) => (
                  <div
                    key={`heatmap-${location.id}`}
                    className="absolute rounded-full bg-gradient-radial from-orange-400/60 to-transparent"
                    style={{
                      left: `${((location.lng - 80.24) / 0.04) * 100}%`,
                      top: `${((13.09 - location.lat) / 0.04) * 100}%`,
                      width: `${location.groupSize * 8}px`,
                      height: `${location.groupSize * 8}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Tourist Locations */}
            {showTouristClusters &&
              touristLocations.map((location) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${((location.lng - 80.24) / 0.04) * 100}%`,
                    top: `${((13.09 - location.lat) / 0.04) * 100}%`,
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="relative">
                    <div
                      className={`w-4 h-4 rounded-full ${getStatusColor(location.status)} border-2 border-white shadow-lg animate-pulse`}
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {location.groupSize}
                    </div>
                  </div>
                </div>
              ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <h4 className="font-semibold text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Safe Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>High Risk</span>
                </div>
              </div>
            </div>

            {/* Compass */}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details Panel */}
      {selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Details
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <p className="text-sm text-muted-foreground">{selectedLocation.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={getStatusBadgeVariant(selectedLocation.status)} className="mt-1">
                  {selectedLocation.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Group Size</Label>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedLocation.groupSize} tourists
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Coordinates</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Seen</Label>
                <p className="text-sm text-muted-foreground">{selectedLocation.lastSeen}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Tourist ID</Label>
                <p className="text-sm text-muted-foreground">{selectedLocation.id}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Track Location
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SensorProvider, useSensorContext } from '@/contexts/SensorContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Navigation, ArrowRight, LocateFixed, AlertCircle, Map } from 'lucide-react';
import { toast } from 'sonner';

const riskZones = [
  {
    id: 1,
    name: "Downtown Intersection",
    location: "Main St & Broadway",
    riskLevel: "High",
    distance: "200m",
    incidents: 12,
    type: "Intersection"
  },
  {
    id: 2,
    name: "Highway Entrance",
    location: "I-95 North Ramp",
    riskLevel: "Medium",
    distance: "1.2km",
    incidents: 8,
    type: "Highway"
  },
  {
    id: 3,
    name: "School Zone",
    location: "Franklin Elementary",
    riskLevel: "Medium",
    distance: "800m",
    incidents: 5,
    type: "School Zone"
  },
  {
    id: 4,
    name: "Sharp Turn",
    location: "Mountain View Rd",
    riskLevel: "High",
    distance: "400m",
    incidents: 15,
    type: "Road Condition"
  },
];

const RiderAlertsContent = () => {
  const navigate = useNavigate();
  const { sensorData } = useSensorContext();
  const [activeAlert, setActiveAlert] = useState(false);
  const [alertProgress, setAlertProgress] = useState(0);
  const [remainingDistance, setRemainingDistance] = useState(200);

  useEffect(() => {
    // Simulation of approaching an accident zone
    const timeout = setTimeout(() => {
      setActiveAlert(true);
      toast.warning("Caution! You're approaching an accident-prone zone.", {
        duration: 5000,
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (activeAlert) {
      const interval = setInterval(() => {
        setAlertProgress(prev => {
          const newValue = prev + 1;
          if (newValue >= 100) {
            clearInterval(interval);
            
            // After alert completes, navigate to the next page
            setTimeout(() => {
              navigate('/government-insights');
            }, 3000);
            
            return 100;
          }
          return newValue;
        });
        
        setRemainingDistance(prev => Math.max(0, prev - 2));
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [activeAlert, navigate]);

  const riskLevelColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Real-Time Rider Alerts</h1>
        <p className="text-muted-foreground">
          AI-powered warning system for accident-prone areas and dangerous conditions.
        </p>
      </div>

      {/* Active Alert Card */}
      {activeAlert && (
        <Card className="glass-card border-amber-200 mb-8 overflow-hidden animate-scale-in">
          <div className="bg-amber-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="font-semibold">SAFETY ALERT</h2>
            </div>
            <Badge variant="outline" className="bg-white text-amber-600 border-white">
              {remainingDistance}m ahead
            </Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Caution! Accident-prone zone ahead</h3>
                <p className="text-sm text-muted-foreground">Reduce speed and exercise caution</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>Downtown Intersection - Main St & Broadway</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>12 accidents recorded in this area</span>
              </div>
              <div className="flex items-center gap-3">
                <Navigation className="h-5 w-5 text-blue-500" />
                <span>Recommended speed: 15 km/h (current: {sensorData.speed.value.toFixed(1)} km/h)</span>
              </div>
            </div>
            
            <div className="h-24 mb-4 relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
                <Map className="w-full h-full text-amber-200 opacity-20" />
                <div className="absolute flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <LocateFixed className="h-3 w-3" />
                      </div>
                      <div className="absolute -inset-1 bg-blue-500 rounded-full animate-ping-slow opacity-40"></div>
                    </div>
                    <div className="h-10 w-0.5 bg-dashed border-l border-dashed border-blue-300"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                      <AlertTriangle className="h-3 w-3" />
                    </div>
                    <div className="h-10 w-0.5 border-l border-dashed border-red-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Zone Map Card */}
      <Card className="glass-card mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Accident-Prone Areas in Your Route</h3>
          
          <div className="h-64 bg-gray-100 rounded-lg mb-6 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-200">
              <Map className="w-full h-full" />
            </div>
            <div className="absolute top-4 left-4 glass-card p-2 text-sm">
              <div className="font-medium">Current Route:</div>
              <div className="text-muted-foreground">Downtown to Riverside Park</div>
            </div>
            
            {/* Risk zone markers */}
            <div className="absolute top-1/3 left-1/4">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                !
              </div>
              <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping-slow opacity-40"></div>
            </div>
            <div className="absolute top-2/3 left-1/2">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
                !
              </div>
            </div>
            <div className="absolute top-1/4 right-1/4">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
                !
              </div>
            </div>
            <div className="absolute top-1/2 right-1/3">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                !
              </div>
              <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping-slow opacity-40"></div>
            </div>
            
            {/* Current location */}
            <div className="absolute bottom-1/4 left-1/5">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <LocateFixed className="h-3 w-3" />
              </div>
              <div className="absolute -inset-1 bg-blue-500 rounded-full animate-ping-slow opacity-40"></div>
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {riskZones.map(zone => (
              <div key={zone.id} className="glass-card p-3 text-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{zone.name}</h4>
                  <Badge className={riskLevelColor[zone.riskLevel as keyof typeof riskLevelColor]}>
                    {zone.riskLevel}
                  </Badge>
                </div>
                <div className="text-muted-foreground mt-1">{zone.location}</div>
                <div className="flex justify-between mt-2">
                  <span>{zone.incidents} incidents</span>
                  <span>{zone.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Types Card */}
      <Card className="glass-card mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Proactive Safety Alerts</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Accident Zone Warnings</h4>
                <p className="text-sm text-muted-foreground">
                  Alerts for areas with high historical accident rates, prompting reduced speed and increased awareness.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                <Navigation className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Route Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Suggestions for safer alternative routes based on real-time and historical safety data.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Infrastructure Hazards</h4>
                <p className="text-sm text-muted-foreground">
                  Notifications about dangerous road conditions, construction zones, or infrastructure issues.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <LocateFixed className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Behavioral Coaching</h4>
                <p className="text-sm text-muted-foreground">
                  Personalized safety tips based on riding patterns to improve overall safety habits.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={() => navigate('/government-insights')}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Continue to Government Insights <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const RiderAlerts = () => (
  <SensorProvider>
    <RiderAlertsContent />
  </SensorProvider>
);

export default RiderAlerts;

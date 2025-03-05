
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SensorProvider, useSensorContext } from '@/contexts/SensorContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Timer, 
  Wifi, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SosActivationContent = () => {
  const { sensorData } = useSensorContext();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [emergencyStatus, setEmergencyStatus] = useState('initializing');
  const [emergencyServices, setEmergencyServices] = useState({
    calculating: true,
    serviceFound: false,
    service: '',
    eta: '',
  });

  // Log that we've entered the SOS activation page
  useEffect(() => {
    console.log("SOS Activation page rendered");
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0 && emergencyStatus === 'initializing') {
      setEmergencyStatus('connecting');
      
      toast.info("Connecting to emergency services...");
      
      setTimeout(() => {
        setEmergencyStatus('transmitting');
        
        setEmergencyServices({
          calculating: false,
          serviceFound: true,
          service: 'Ambulance Service',
          eta: '8 minutes',
        });
        
        toast.success("Emergency services notified! Help is on the way.");
        
        setTimeout(() => {
          navigate('/data-logging');
        }, 5000);
      }, 3000);
    }
  }, [countdown, emergencyStatus, navigate]);

  const alertColor = emergencyStatus === 'initializing' ? 'bg-amber-500' : emergencyStatus === 'connecting' ? 'bg-amber-600' : 'bg-green-500';

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-8 w-8 text-red-500 animate-pulse-soft" />
          <h1 className="text-3xl font-bold">SOS Emergency Activation</h1>
        </div>
        <p className="text-muted-foreground">
          Automatic emergency response system activated due to critical sensor readings.
        </p>
      </div>

      <Card className="glass-card border-red-200 mb-8 overflow-hidden animate-scale-in">
        <div className="bg-red-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <h2 className="font-semibold">EMERGENCY ALERT ACTIVATED</h2>
          </div>
          <div className="px-2 py-1 rounded-full bg-white text-red-500 text-sm font-medium">
            {emergencyStatus === 'initializing' ? 'INITIALIZING' : 
             emergencyStatus === 'connecting' ? 'CONNECTING' : 'ACTIVE'}
          </div>
        </div>
        <CardContent className="p-6">
          {emergencyStatus === 'initializing' && (
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className={`absolute inset-0 rounded-full ${alertColor} opacity-25 animate-ping-slow`}></div>
                <div className={`relative flex items-center justify-center w-32 h-32 rounded-full ${alertColor} text-white`}>
                  <Timer className="h-12 w-12" />
                </div>
              </div>
              <p className="text-xl font-bold">Emergency Services Notification in</p>
              <p className="text-4xl font-bold text-red-500 my-2">{countdown}</p>
              <p className="text-muted-foreground">Tap "Cancel" if this is a false alarm</p>
            </div>
          )}

          {emergencyStatus === 'connecting' && (
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className={`absolute inset-0 rounded-full ${alertColor} opacity-25 animate-ping-slow`}></div>
                <div className={`relative flex items-center justify-center w-32 h-32 rounded-full ${alertColor} text-white`}>
                  <Wifi className="h-12 w-12" />
                </div>
              </div>
              <p className="text-xl font-bold">Connecting to Emergency Services</p>
              <div className="mt-4">
                <Progress value={65} className="h-2" />
              </div>
            </div>
          )}

          {emergencyStatus === 'transmitting' && (
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className={`absolute inset-0 rounded-full ${alertColor} opacity-25 animate-ping-slow`}></div>
                <div className={`relative flex items-center justify-center w-32 h-32 rounded-full ${alertColor} text-white`}>
                  <CheckCircle className="h-12 w-12" />
                </div>
              </div>
              <p className="text-xl font-bold text-green-500">Emergency Services Notified</p>
              <p className="text-lg font-medium mt-2">{emergencyServices.service} - ETA: {emergencyServices.eta}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Location</h3>
              </div>
              <p className="text-sm">{sensorData.gps.value}</p>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Emergency Contact</h3>
              </div>
              <p className="text-sm">Local Emergency Services - 911</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Critical Data Being Transmitted</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Gyroscope</span>
                <span className="font-medium">{sensorData.gyroscope.value.toFixed(1)} {sensorData.gyroscope.unit}</span>
              </div>
              <Progress 
                value={(sensorData.gyroscope.value / sensorData.gyroscope.threshold) * 100} 
                className="h-2 bg-secondary" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Accelerometer</span>
                <span className="font-medium">{sensorData.accelerometer.value.toFixed(1)} {sensorData.accelerometer.unit}</span>
              </div>
              <Progress 
                value={(sensorData.accelerometer.value / sensorData.accelerometer.threshold) * 100} 
                className="h-2 bg-secondary" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Speed</span>
                <span className="font-medium">{sensorData.speed.value.toFixed(1)} {sensorData.speed.unit}</span>
              </div>
              <Progress 
                value={(sensorData.speed.value / sensorData.speed.threshold) * 100} 
                className="h-2 bg-secondary" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Battery</span>
                <span className="font-medium">{sensorData.battery.value.toFixed(0)} {sensorData.battery.unit}</span>
              </div>
              <Progress 
                value={sensorData.battery.value} 
                className="h-2 bg-secondary" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        {emergencyStatus === 'initializing' && (
          <Button 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => {
              toast.info("Emergency alert canceled");
              navigate('/sensor-input');
            }}
          >
            Cancel Alert (False Alarm)
          </Button>
        )}
        
        {emergencyStatus === 'transmitting' && (
          <Button 
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => navigate('/data-logging')}
          >
            Continue to Data Logging
          </Button>
        )}
      </div>
    </div>
  );
};

const SosActivation = () => (
  <SensorProvider>
    <SosActivationContent />
  </SensorProvider>
);

export default SosActivation;

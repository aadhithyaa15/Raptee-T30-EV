import React, { useEffect, useState } from 'react';
import { SensorProvider, useSensorContext } from '@/contexts/SensorContext';
import SensorCard from '@/components/SensorCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  RotateCw, 
  Compass, 
  Move, 
  Gauge, 
  Navigation, 
  Gauge as SpeedGauge, 
  Battery 
} from 'lucide-react';

const generateChartData = (points: number, minValue: number, maxValue: number) => {
  return Array.from({ length: points }, () => ({
    value: Math.random() * (maxValue - minValue) + minValue
  }));
};

const SensorInputContent = () => {
  const { sensorData, startDemo, stopDemo, resetSensors } = useSensorContext();
  const [progress, setProgress] = useState(0);
  
  const gyroChartData = generateChartData(15, 0, sensorData.gyroscope.value * 1.2);
  const accelChartData = generateChartData(15, 0, sensorData.accelerometer.value * 1.2);
  const baroChartData = generateChartData(15, 950, sensorData.barometer.value);
  const speedChartData = generateChartData(15, 0, sensorData.speed.value * 1.2);
  const batteryChartData = generateChartData(15, 50, sensorData.battery.value);

  const gyroPercent = (sensorData.gyroscope.value / sensorData.gyroscope.threshold) * 100;
  const accelPercent = (sensorData.accelerometer.value / sensorData.accelerometer.threshold) * 100;
  const baroPercent = ((sensorData.barometer.value - 1000) / (sensorData.barometer.threshold - 1000)) * 100;
  const speedPercent = (sensorData.speed.value / sensorData.speed.threshold) * 100;

  const criticalSensorsCount = [
    sensorData.gyroscope.status,
    sensorData.accelerometer.status,
    sensorData.barometer.status,
    sensorData.speed.status
  ].filter(status => status === 'critical').length;

  const getAlertMessage = () => {
    if (criticalSensorsCount >= 2) {
      return (
        <div className="mt-4 text-center text-red-500 font-medium animate-pulse-soft">
          EMERGENCY: {criticalSensorsCount} sensors in CRITICAL state! SOS activation imminent...
        </div>
      );
    } else if (gyroPercent > 50 && accelPercent > 50 && baroPercent > 50 && speedPercent > 50) {
      return (
        <div className="mt-4 text-center text-red-500 font-medium animate-pulse-soft">
          Warning: All sensors above 50% threshold! SOS activation imminent...
        </div>
      );
    } else if (
      criticalSensorsCount === 1 ||
      gyroPercent > 50 || 
      accelPercent > 50 || 
      baroPercent > 50 || 
      speedPercent > 50
    ) {
      return (
        <div className="mt-4 text-center text-amber-500 font-medium">
          Caution: Some sensors approaching critical thresholds
        </div>
      );
    } else {
      return (
        <div className="mt-4 text-center text-green-600 font-medium">
          Normal operation: All sensors within safe parameters
        </div>
      );
    }
  };

  useEffect(() => {
    if (sensorData.demoMode) {
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 1;
          if (newValue >= 100) {
            clearInterval(interval);
          }
          return Math.min(newValue, 100);
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [sensorData.demoMode]);

  useEffect(() => {
    if (sensorData.demoMode) {
      console.log("Sensor Percentages:", {
        gyroPercent,
        accelPercent,
        baroPercent,
        speedPercent,
        criticalSensorsCount,
        thresholdExceeded: sensorData.thresholdExceeded,
        allOver50: gyroPercent > 50 && accelPercent > 50 && baroPercent > 50 && speedPercent > 50
      });
    }
  }, [sensorData, gyroPercent, accelPercent, baroPercent, speedPercent, criticalSensorsCount]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Real-time Sensor Monitoring</h1>
        <p className="text-muted-foreground">
          Continuous tracking of electric bike sensor data to detect potential accident scenarios.
        </p>
      </div>

      {sensorData.demoMode && (
        <div className="mb-8 glass-card p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Simulation Progress</h3>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {getAlertMessage()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SensorCard
          icon={<Compass className="h-5 w-5" />}
          title="Gyroscope"
          value={sensorData.gyroscope.value.toFixed(1)}
          unit={sensorData.gyroscope.unit}
          status={sensorData.gyroscope.status}
          chartData={gyroChartData}
          color="gyro"
        />
        
        <SensorCard
          icon={<Move className="h-5 w-5" />}
          title="Accelerometer"
          value={sensorData.accelerometer.value.toFixed(1)}
          unit={sensorData.accelerometer.unit}
          status={sensorData.accelerometer.status}
          chartData={accelChartData}
          color="accel"
        />
        
        <SensorCard
          icon={<Gauge className="h-5 w-5" />}
          title="Barometer"
          value={sensorData.barometer.value.toFixed(1)}
          unit={sensorData.barometer.unit}
          status={sensorData.barometer.status}
          chartData={baroChartData}
          color="baro"
        />
        
        <SensorCard
          icon={<Navigation className="h-5 w-5" />}
          title="GPS Location"
          value={sensorData.gps.value}
          unit=""
          status={sensorData.gps.status}
          chartData={[]} // GPS doesn't have chart data
          color="gps"
        />
        
        <SensorCard
          icon={<SpeedGauge className="h-5 w-5" />}
          title="Speed"
          value={sensorData.speed.value.toFixed(1)}
          unit={sensorData.speed.unit}
          status={sensorData.speed.status}
          chartData={speedChartData}
          color="speed"
        />
        
        <SensorCard
          icon={<Battery className="h-5 w-5" />}
          title="Battery"
          value={sensorData.battery.value.toFixed(0)}
          unit={sensorData.battery.unit}
          status={sensorData.battery.status}
          chartData={batteryChartData}
          color="battery"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {!sensorData.demoMode ? (
          <Button 
            size="lg" 
            className="bg-primary text-white"
            onClick={startDemo}
          >
            Watch Demo
          </Button>
        ) : (
          <Button 
            size="lg" 
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={stopDemo}
          >
            Stop Demo
          </Button>
        )}
        
        <Button 
          size="lg" 
          variant="outline"
          onClick={resetSensors}
        >
          <RotateCw className="mr-2 h-4 w-4" /> Reset Sensors
        </Button>
      </div>
    </div>
  );
};

const SensorInput = () => (
  <SensorProvider>
    <SensorInputContent />
  </SensorProvider>
);

export default SensorInput;

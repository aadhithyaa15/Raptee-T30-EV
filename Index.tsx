
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Bike, AlertTriangle, ArrowRight } from 'lucide-react';
import { SensorProvider } from '@/contexts/SensorContext';

const Index = () => {
  const navigate = useNavigate();

  return (
    <SensorProvider>
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Hero Section */}
        <section className="bg-[#0b1121] text-white py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="inline-block bg-primary/10 text-primary rounded-lg px-3 py-1 text-sm font-medium mb-2">
                  Advanced Safety Technology
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  AI-Powered Accident Detection & <span className="text-blue-400">Emergency Response</span>
                </h1>
                <p className="text-lg text-gray-300 mt-2 md:text-xl">
                  Protecting EV drivers with real-time accident detection and instant emergency response.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/sensor-input')}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/data-logging')}
                    className="bg-transparent border-gray-600 text-gray-200 hover:bg-gray-800"
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end animate-slide-up delay-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-30"></div>
                  <div className="relative rounded-full w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                    <Bike className="w-32 h-32 text-white" />
                    <div className="absolute w-full h-full rounded-full animate-ping-slow opacity-40 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Protecting Lives with Advanced Technology</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered system uses advanced IoT sensors to detect accidents in real-time,
                automatically notifying emergency services and providing critical information to first responders.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Sensor Monitoring",
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  description: "Continuous tracking of gyroscope, accelerometer, barometer, GPS, speed, and battery status.",
                  link: "/sensor-input"
                },
                {
                  title: "Automatic SOS Activation",
                  icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
                  description: "Immediate emergency response when accident detection thresholds are exceeded.",
                  link: "/sos-activation"
                },
                {
                  title: "AI-Powered Risk Analysis",
                  icon: <Bike className="h-8 w-8 text-blue-600" />,
                  description: "Machine learning models identify accident-prone areas and provide real-time alerts.",
                  link: "/rider-alerts"
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" size="sm" onClick={() => navigate(feature.link)} className="mt-auto">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Safety?</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
              Take a tour of our interactive demonstration to see how our AI-powered system can protect cyclists in real-time.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/sensor-input')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Start the Demo
            </Button>
          </div>
        </section>
      </div>
    </SensorProvider>
  );
};

export default Index;

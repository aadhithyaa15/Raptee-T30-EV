
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

const GovernmentInsights = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Government Safety Insights</h1>
        <p className="text-muted-foreground">
          Access to data-driven insights to identify high-risk areas and improve road safety infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card col-span-1 lg:col-span-2 animate-scale-in">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              High-risk Accident Zones
            </h3>
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map visualization would appear here</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <h4 className="font-medium text-sm mb-1">Zone #1</h4>
                <p className="text-sm text-muted-foreground">Downtown Intersection</p>
                <p className="text-red-500 font-medium text-sm mt-2">12 incidents</p>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-medium text-sm mb-1">Zone #2</h4>
                <p className="text-sm text-muted-foreground">Harbor Bridge Access</p>
                <p className="text-amber-500 font-medium text-sm mt-2">8 incidents</p>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-medium text-sm mb-1">Zone #3</h4>
                <p className="text-sm text-muted-foreground">University Avenue</p>
                <p className="text-amber-500 font-medium text-sm mt-2">6 incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Safety Recommendations
            </h3>
            <div className="space-y-3">
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Add protected bike lane on Main St</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">High Impact</span>
                  <span className="text-xs text-muted-foreground">Est. cost: $120,000</span>
                </div>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Improve lighting at Harbor Bridge</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">High Impact</span>
                  <span className="text-xs text-muted-foreground">Est. cost: $45,000</span>
                </div>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Traffic calming near University Ave</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Medium Impact</span>
                  <span className="text-xs text-muted-foreground">Est. cost: $30,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card animate-scale-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Accident Trend Analysis
            </h3>
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Trend chart visualization would appear here</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Based on 12-month historical data, there has been a 15% reduction in accidents in areas where infrastructure improvements were implemented.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Policy Recommendations</h3>
            <div className="space-y-3">
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Expand protected bike lane network</p>
                <p className="text-xs text-muted-foreground mt-1">Potential to reduce accidents by 32% in urban areas</p>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Implement 20 mph zones near schools</p>
                <p className="text-xs text-muted-foreground mt-1">Can reduce severity of injuries by up to 40%</p>
              </div>
              <div className="glass-card p-3">
                <p className="text-sm font-medium">Increase lighting standards in high-risk areas</p>
                <p className="text-xs text-muted-foreground mt-1">Prevents up to 25% of nighttime accidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button className="bg-primary text-white">
          Generate Comprehensive Report
        </Button>
      </div>
    </div>
  );
};

export default GovernmentInsights;

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Phone, HelpCircle, User, MapPin, Clock, Droplets } from 'lucide-react';
import { Metadata } from 'next';

interface DisasterCard {
  id: string;
  title: string;
  location: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  timeAgo: string;
}

export const metadata: Metadata = {
  title: 'Home',
}
 

const DisasterDashboard: React.FC = () => {
  const disasters: DisasterCard[] = [
    {
      id: '1',
      title: 'Urban Flooding - Kakkanad Area',
      location: 'Kakkanad Area',
      description: 'Heavy rainfall causing water logging in IT corridor. Water has risen unexpectedly and has disrupted traffic.',
      severity: 'high',
      type: 'Flooding',
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      title: 'Urban Flooding - Kakkanad Area',
      location: 'Kakkanad Area', 
      description: 'Heavy rainfall causing water logging in IT corridor. Water has risen unexpectedly and has disrupted traffic.',
      severity: 'medium',
      type: 'Flooding',
      timeAgo: '3 hours ago'
    },
    {
      id: '3',
      title: 'Urban Flooding - Kakkanad Area',
      location: 'Kakkanad Area',
      description: 'Heavy rainfall causing water logging in IT corridor. Water has risen unexpectedly and has disrupted traffic.',
      severity: 'medium',
      type: 'Flooding', 
      timeAgo: '4 hours ago'
    }
  ];




  return (
    <div className="min-h-screen bg-gray-50">     
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Weather Alert */}
        <Alert className="bg-orange-50 border-orange-200">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Weather Alert:</strong> Heavy rainfall expected in Ernakulam district. Stay indoors and avoid waterlogged areas.
          </AlertDescription>
        </Alert>

        {/* Disasters Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Disasters in My Area (Ernakulam)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disasters.map((disaster) => (
              <Card key={disaster.id} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      {disaster.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{disaster.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm text-gray-600 leading-relaxed">
                    {disaster.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className={`bg-[#1A5F7A] hover:bg-[#235163] text-white`}
                      >
                        <Droplets className="w-3 h-3 mr-1" />
                        See More
                      </Button>
                      
                      <Badge 
                        variant="outline" 
                        className={`bg-[#f3b44f98] p-1 text-xs text-[#af7c2a]`}
                      >
                        High Category
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{disaster.timeAgo}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Activity Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">My Activity</h2>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-gray-900">
                Resource Request - Medical Help
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Requested 2 hours ago
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <CardDescription className="text-sm text-gray-600 leading-relaxed">
                Medical team required. Ambulance not reach your location due to floods.
              </CardDescription>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  See More
                </Button>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default DisasterDashboard;
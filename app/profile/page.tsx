"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { User, Phone, Mail, MapPin, Shield, Edit3, Trash2 } from 'lucide-react';
import { Metadata } from 'next';

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

interface Contribution {
  id: string;
  title: string;
  description: string;
  date: string;
  verified: boolean;
}



const UserProfile: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    { id: 'disasters', label: 'Disaster Alerts in My Area', enabled: true },
    { id: 'weather', label: 'Weather Warnings', enabled: true },
    { id: 'resources', label: 'Resource Request Updates', enabled: true },
    { id: 'volunteer', label: 'Volunteer Opportunities', enabled: false },
  ]);

  const contributions: Contribution[] = [
    {
      id: '1',
      title: 'Food Donation - Flood Relief 2024',
      description: 'Donated: 50 food packets • December 2024',
      date: 'December 2024',
      verified: true
    },
    {
      id: '2',
      title: 'Food Donation - Flood Relief 2024',
      description: 'Donated: 50 food packets • December 2024',
      date: 'December 2024',
      verified: true
    }
  ];

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="max-w-7xl mx-auto p-6">
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Avatar and Basic Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    RK
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">Ravi Kumar</h3>
                    <p className="text-sm text-gray-600">Ernakulam District • Joined: Jan 2025</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                      Verified User
                    </Badge>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone:</p>
                        <p className="text-sm text-gray-600">+91 9876543210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Address:</p>
                        <p className="text-sm text-gray-600">Kakkanad, Ernakulam</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email:</p>
                        <p className="text-sm text-gray-600">ravi.kumar@email.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Emergency Contact:</p>
                        <p className="text-sm text-gray-600">+91 9876543211</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Contribution History */}
            <Card className='h-96 overscroll-auto overflow-y-scroll'>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">My Contribution History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contributions.map((contribution) => (
                  <div key={contribution.id} className="border-l-4 border-l-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <h4 className="font-medium text-gray-900">{contribution.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{contribution.description}</p>
                    {contribution.verified && (
                      <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        Verified User
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {setting.enabled ? 'Enable' : 'Disable'}
                      </span>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => toggleNotification(setting.id)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
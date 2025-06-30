import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Weather Alert Skeleton */}
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 flex items-start space-x-3">
            <Skeleton className="h-4 w-4 rounded-full bg-orange-200" />
            <Skeleton className="h-4 w-full max-w-md bg-orange-200" />
          </CardContent>
        </Card>

        {/* Disasters Section Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-l-4 border-l-gray-300">
                <CardHeader className="pb-3 space-y-2">
                  <Skeleton className="h-5 w-full bg-gray-200" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full bg-gray-200" />
                    <Skeleton className="h-3 w-4/5 bg-gray-200" />
                    <Skeleton className="h-3 w-3/4 bg-gray-200" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-24 bg-gray-200" />
                      <Skeleton className="h-6 w-20 bg-gray-200" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-3 w-3 bg-gray-200" />
                    <Skeleton className="h-3 w-16 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Activity Section Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-36 bg-gray-200" />
          
          <Card className="border-l-4 border-l-gray-300">
            <CardHeader className="pb-3 space-y-2">
              <Skeleton className="h-5 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-gray-200" />
                <Skeleton className="h-3 w-4/5 bg-gray-200" />
              </div>
              
              <Skeleton className="h-8 w-24 bg-gray-200" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
const ProfileFormSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg animate-pulse">
      {/* Avatar Skeleton */}
      <div className="flex items-center gap-4 justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-300"></div>
      </div>
      
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Skeleton Fields */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded-md"></div>
          ))}
        </div>
        
        {/* Address Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded-md"></div>
          ))}
        </div>
        
        {/* Save Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded-md w-full"></div>
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;

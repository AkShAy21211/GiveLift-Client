"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Bell,
  Shield,
  Heart,
  Users,
  AlertTriangle,
  CloudRain,
  Package,
  Edit,
  Trash2,
  Save,
  X,
  LogOut,
} from "lucide-react";
import { getProfile, updateProfile } from "../api/index";
import { User } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logoutHandler } from "@/app/(auth)/api";
import { logoutAction } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { persistor } from "@/store/store";

// Define Zod schemas
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(
      /^$|^\+91\s\d{10}$/,
      "Phone must be in format +91 XXXXXXXXXX or empty"
    )
    .optional(),
  address: z.object({
    district: z.string().min(2, "District must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
  }),
  isVolunteer: z.boolean().optional(),
});
const notificationSchema = z.object({
  disasterAlerts: z.boolean(),
  weatherWarnings: z.boolean(),
  resourceUpdates: z.boolean(),
  volunteerOpportunities: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type NotificationFormData = z.infer<typeof notificationSchema>;

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingNotifications, setIsEditingNotifications] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profileData, setProfileData] = useState<null | Partial<User>>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const response = await getProfile();
      if (response?.data) {
        setProfileData(response.data);
      }
    }
    fetchProfile();
  }, []);

  const [notificationData, setNotificationData] = useState({
    disasterAlerts: true,
    weatherWarnings: true,
    resourceUpdates: true,
    volunteerOpportunities: false,
  });

  // Initialize forms
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profileData?.name,
      email: profileData?.email,
      phone: profileData?.phone,
      address: {
        district: profileData?.address?.district,
        state: profileData?.address?.state,
        country: profileData?.address?.country,
      },
    },
  });

  const {
    register: registerNotifications,
    handleSubmit: handleNotificationSubmit,
    reset: resetNotifications,
    watch: watchNotifications,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: notificationData,
  });

  const notificationValues = watchNotifications();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name?.split("")[0].charAt(0);
  };
  const contributions = [
    {
      id: 1,
      title: "Food Donation - Flood Relief 2024",
      description: "Donated: 50 food packets",
      date: "December 2024",
      color: "blue",
    },
    {
      id: 2,
      title: "Medical Supplies - Cyclone Relief",
      description: "Donated: First aid kits",
      date: "November 2024",
      color: "green",
    },
  ];

  const handleProfileEdit = () => {
    resetProfile({
      name: profileData?.name,
      email: profileData?.email,
      phone: profileData?.phone,
      address: {
        district: profileData?.address?.district,
        state: profileData?.address?.state,
        country: profileData?.address?.country,
      },
    });
    setIsEditingProfile(true);
  };

  const onProfileSubmit = async (data: Partial<ProfileFormData>) => {
    await updateProfile(profileData?._id as string, data as any);
    setProfileData((prev) => ({
      ...prev,
      ...data,
    }));
    setIsEditingProfile(false);
  };

  // In the ProfilePage component, add a function to handle volunteer status toggle
  const toggleVolunteerStatus = async () => {
    const newStatus = !profileData?.isVolunteer;

    await updateProfile(profileData?._id as string, {
      isVolunteer: newStatus,
    });
    setProfileData((prev) => ({
      ...prev,
      isVolunteer: newStatus,
    }));
  };

  const onNotificationSubmit = (data: NotificationFormData) => {
    setNotificationData(data);
    setIsEditingNotifications(false);
  };

  const handleLogout = async () => {
    await logoutHandler();

    dispatch(logoutAction());
    persistor.purge();
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Profile
              </h3>
              <Button
                onClick={() =>
                  isEditingProfile
                    ? setIsEditingProfile(false)
                    : handleProfileEdit()
                }
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {isEditingProfile ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <div className="p-6">
              {isEditingProfile ? (
                <form
                  onSubmit={handleProfileSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...registerProfile("name")}
                      className={`w-full px-3 py-2 border ${
                        profileErrors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your full name"
                    />
                    {profileErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {profileErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </Label>
                    <Input
                      type="email"
                      {...registerProfile("email")}
                      className={`w-full px-3 py-2 border ${
                        profileErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your email"
                    />
                    {profileErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {profileErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      {...registerProfile("phone")}
                      className={`w-full px-3 py-2 border ${
                        profileErrors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="+91 XXXXXXXXXX"
                    />
                    {profileErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {profileErrors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Address Fields */}
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700">
                      Address
                    </Label>

                    <div>
                      <Label className="block text-xs text-gray-500 mb-1">
                        District
                      </Label>
                      <Input
                        type="text"
                        {...registerProfile("address.district")}
                        className={`w-full px-3 py-2 border ${
                          profileErrors.address?.district
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter district"
                      />
                      {profileErrors.address?.district && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.address.district.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-xs text-gray-500 mb-1">
                        State
                      </Label>
                      <Input
                        type="text"
                        {...registerProfile("address.state")}
                        className={`w-full px-3 py-2 border ${
                          profileErrors.address?.state
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter state"
                      />
                      {profileErrors.address?.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.address.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-xs text-gray-500 mb-1">
                        Country
                      </Label>
                      <Input
                        type="text"
                        {...registerProfile("address.country")}
                        className={`w-full px-3 py-2 border ${
                          profileErrors.address?.country
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter country"
                      />
                      {profileErrors.address?.country && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.address.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="block text-sm font-medium text-gray-700">
                      Volunteer Status
                    </Label>
                    <Label className="relative inline-flex items-center cursor-pointer">
                      <Input
                        type="checkbox"
                        {...registerProfile("isVolunteer")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </Label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {getInitials(profileData?.name as string)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {profileData?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {profileData?.role?.replace("_", " ").toUpperCase()} •
                        Joined: {formatDate(profileData?.createdAt as any)}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          {profileData?.isActive
                            ? "Active User"
                            : "Inactive User"}
                        </span>
                        {profileData?.isVolunteer && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Heart className="h-3 w-3 mr-1" />
                            Volunteer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">
                            {profileData?.email}
                          </span>
                        </div>

                        {profileData?.phone ? (
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">
                              {profileData.phone}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">
                              Phone: Not provided
                            </span>
                          </div>
                        )}

                        {profileData?.address && (
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <span className="text-gray-600">Address:</span>
                                <div className="ml-1">
                                  <p className="font-medium">
                                    District: {profileData.address.district}
                                  </p>
                                  <p className="font-medium">
                                    State: {profileData.address.state}
                                  </p>
                                  <p className="font-medium">
                                    Country: {profileData.address.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {profileData?.isVolunteer !== undefined && (
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-sm text-gray-600">
                              Volunteer:
                            </span>
                            <button
                              onClick={toggleVolunteerStatus}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                profileData.isVolunteer
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                                  profileData.isVolunteer
                                    ? "translate-x-5"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          {/* <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </h3>
              <button
                onClick={() => {
                  if (isEditingNotifications) {
                    setIsEditingNotifications(false);
                  } else {
                    resetNotifications(notificationData);
                    setIsEditingNotifications(true);
                  }
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {isEditingNotifications ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </button>
            </div>
            <div className="p-6">
              {isEditingNotifications ? (
                <form
                  onSubmit={handleNotificationSubmit(onNotificationSubmit)}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <label className="font-medium">
                        Disaster Alerts in My Area
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...registerNotifications("disasterAlerts")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <label className="font-medium">Weather Warnings</label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...registerNotifications("weatherWarnings")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-green-500" />
                      <label className="font-medium">
                        Resource Request Updates
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...registerNotifications("resourceUpdates")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-purple-500" />
                      <label className="font-medium">
                        Volunteer Opportunities
                      </label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...registerNotifications("volunteerOpportunities")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">
                        Disaster Alerts in My Area
                      </span>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationData.disasterAlerts
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                          notificationData.disasterAlerts
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Weather Warnings</span>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationData.weatherWarnings
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                          notificationData.weatherWarnings
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-green-500" />
                      <span className="font-medium">
                        Resource Request Updates
                      </span>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationData.resourceUpdates
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                          notificationData.resourceUpdates
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">
                        Volunteer Opportunities
                      </span>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationData.volunteerOpportunities
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                          notificationData.volunteerOpportunities
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* Contribution History */}

        {/* <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              My Contribution History
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className={`bg-white rounded-lg border shadow-sm border-l-4 ${
                    contribution.color === "blue"
                      ? "border-l-blue-500"
                      : "border-l-green-500"
                  }`}
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {contribution.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {contribution.description} • {contribution.date}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        contribution.color === "blue"
                          ? "text-blue-600 border-blue-600"
                          : "text-green-600 border-green-600"
                      }`}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent "
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button
            onClick={() => setShowDeleteDialog(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => setShowDeleteDialog(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Account deleted");
                      setShowDeleteDialog(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                  >
                    Yes, delete my account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

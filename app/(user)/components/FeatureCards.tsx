import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  MapPin, 
  Droplets, 
  Plus, 
  Heart, 
  AlertTriangle, 
  Shield, 
  List, 
  DollarSign,
  History,
  Flag,
  CheckCircle,
  Eye
} from "lucide-react";
import FeatureCardButtons from "./FeatureCardButtons";

interface FeatureCardsProps {
  disasterCount: number;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ disasterCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Disaster Features */}
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <CardTitle className="text-lg">Disaster Center</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription>
            Report new disasters and track ongoing incidents in your area
          </CardDescription>
          <div className="space-y-2">
            <FeatureCardButtons
              buttons={[
                { icon: "Plus" as any, label: "Report New Disaster", href: "/report-disaster" },
                { icon: "List" as any, label: "View Local Disasters", href: "/disasters" },
                // { icon: "MapPin" as any, label: "Disaster Map View", href: "/disasters/map" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Donation System */}
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-green-500" />
            <CardTitle className="text-lg">Help & Donate</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription>
            Pledge resources or make monetary donations to support relief efforts
          </CardDescription>
          <div className="space-y-2">
            <FeatureCardButtons
              buttons={[
                { icon: "Droplets" as any, label: "Pledge Resources", href: "/pledge-resources" },
                // { icon: "DollarSign" as any, label: "Monetary Donation", href: "/donate/money" },
                // { icon: "History" as any, label: "Donation History", href: "/donate/history" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Anti-Fake News */}
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-orange-500" />
            <CardTitle className="text-lg">Truth Center</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription>
            Combat misinformation and access verified information
          </CardDescription>
          <div className="space-y-2">
            <FeatureCardButtons
              buttons={[
                { icon: "Flag" as any, label: "Report Rumor", href: "/report-rumor" },
                // { icon: "CheckCircle" as any, label: "Official Alerts", href: "/alerts" },
                // { icon: "Eye" as any, label: "Fact-Checked Stories", href: "/fact-check" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <CardTitle className="text-lg">Community Stats</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription>
            Track community response and verified information
          </CardDescription>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Disasters</span>
              <Badge variant="destructive">{disasterCount}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Donations Today</span>
              <Badge variant="default">24</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rumors Checked</span>
              <Badge variant="secondary">12</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCards;
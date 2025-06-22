import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: "Active Disasters",
      value: 3,
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      title: "Resource Requests",
      value: 47,
      icon: <Activity className="h-5 w-5" />,
    },
    { title: "Volunteers", value: 32, icon: <Users className="h-5 w-5" /> },
    {
      title: "Response Rate",
      value: "89%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  const disasters = [
    {
      id: 1,
      title: "Urban Flooding - Kakkanad Area",
      reportedBy: "me",
      time: "3 hours ago",
      status: "Active",
      description:
        "Heavy rainfall causing water logging in IT corridor. Traffic severely affected.",
    },
    {
      id: 2,
      title: "Power Outage - Kaloor",
      reportedBy: "me",
      time: "6 hours ago",
      status: "Resolving",
      description:
        "Transformer failure affecting 200+ households. KSEB team deployed.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">District Coordinator Dashboard</h1>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-xl text-gray-600">Ernakulam District</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Meera Nair</span>
            {/* Avatar could be added here */}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card className="border border-slate-200 hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disasters Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">My District Disasters</h2>
          <Button className="bg-primary hover:bg-primary-dark text-white">
            Report New Disaster
          </Button>
        </div>

        {/* Disasters List */}
        <div className="space-y-4">
          {disasters.map((disaster) => (
            <Card key={disaster.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{disaster.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>Reported by {disaster.reportedBy}</span>
                      <span>•</span>
                      <span>{disaster.time}</span>
                      <span>•</span>
                      <Badge
                        variant="outline"
                        className={
                          disaster.status === "Active"
                            ? "border-rose-200 bg-rose-50 text-rose-600"
                            : disaster.status === "Resolving"
                            ? "border-amber-200 bg-amber-50 text-amber-600"
                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                        }
                      >
                        {disaster.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{disaster.description}</p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                  <Button variant="outline" size="sm">
                    {disaster.status === "Active"
                      ? "Manage Resources"
                      : "View Progress"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

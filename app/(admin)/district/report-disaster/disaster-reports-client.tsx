"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  MapPin,
  Users,
  AlertTriangle,
  Calendar,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  DisasterReport,
  SEVERITY_LEVELS,
  updateDisasterReportStatus,
} from "@/lib/api/disaster";
import DisasterReportForm from "./disaster-report-form";

interface DisasterReportsClientProps {
  initialReports: DisasterReport[];
}

export default function DisasterReportsClient({
  initialReports,
}: DisasterReportsClientProps) {
  const [reports, setReports] = useState<DisasterReport[]>(initialReports);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DisasterReport | null>(
    null
  );
  const [currentDisaster, setCurrentDisaster] = useState<DisasterReport | null>(
    null
  );
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Filter reports based on severity and status
  const filteredReports = reports.filter((report) => {
    const severityMatch =
      filterSeverity === "all" || report.severity === filterSeverity;
    const statusMatch =
      filterStatus === "all" || report.status === filterStatus;
    return severityMatch && statusMatch;
  });

  const handleViewReport = (report: DisasterReport) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleEditClick = (disaster: DisasterReport) => {
    setCurrentDisaster(disaster);
    setEditDialogOpen(true);
  };

  // const handleDeleteClick = (coordinator: Coordinator) => {
  //   setCurrentCoordinator(coordinator);
  //   setDeleteDialogOpen(true);
  // };

  const handleStatusUpdate = (
    reportId: string,
    newStatus: DisasterReport["status"]
  ) => {
    startTransition(async () => {
      try {
        const result = await updateDisasterReportStatus(reportId, newStatus);

        if (result.success) {
          // Optimistically update the UI
          setReports((prev) =>
            prev.map((r) =>
              r._id === reportId ? { ...r, status: newStatus } : r
            )
          );
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to update status");
      }
    });
  };

  const handleFormSuccess = () => {
    setCreateDialogOpen(false);
    router.refresh();
  };

  const handleEditFormSuccess = () => {
    setEditDialogOpen(false);
    router.refresh();
  };

  const getSeverityInfo = (level: string) => {
    return SEVERITY_LEVELS.find((s) => s.value === level) || SEVERITY_LEVELS[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-blue-100 text-blue-800";
      case "responding":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              {SEVERITY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="responding">Responding</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Report Disaster
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const severityInfo = getSeverityInfo(report.severity);

          return (
            <Card
              key={report._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {report.address}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewReport(report)}
                        className="flex items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {report.status !== "resolved" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(report)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(
                                report?._id as string,
                                "verified"
                              )
                            }
                            disabled={report.status === "verified"}
                          >
                            Mark as Verified
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(
                                report?._id as string,
                                "responding"
                              )
                            }
                            disabled={report.status === "responding"}
                          >
                            Mark as Responding
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(
                                report?._id as string,
                                "resolved"
                              )
                            }
                          >
                            Mark as Resolved
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={severityInfo.color}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {severityInfo.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getStatusColor(report?.status as string)}
                  >
                    {(report?.status?.charAt(0).toUpperCase() as string) +
                      report?.status?.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="font-medium text-gray-900">
                    {report.disasterType}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {report?.address}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(report?.createdAt as string).toLocaleDateString()}
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {report.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {report.resourcesNeeded.slice(0, 2).map((resource, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {resource}
                    </Badge>
                  ))}
                  {report.resourcesNeeded.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{report.resourcesNeeded.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No disaster reports found
          </h3>
          <p className="text-gray-600 mb-4">
            {filterSeverity !== "all" || filterStatus !== "all"
              ? "Try adjusting your filters to see more results."
              : "No disaster reports have been submitted yet."}
          </p>
          <Button onClick={() => setCreateDialogOpen(true)} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Report First Disaster
          </Button>
        </div>
      )}

      {/* Create Disaster Report Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Report Disaster
            </DialogTitle>
          </DialogHeader>
          <DisasterReportForm
            mode="create"
            disaster={currentDisaster}
            onSuccess={handleFormSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Create Disaster Report Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Disaster
            </DialogTitle>
          </DialogHeader>
          <DisasterReportForm
            disaster={currentDisaster}
            mode="edit"
            onSuccess={handleEditFormSuccess}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Disaster Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">{selectedReport.address}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Disaster Type</h4>
                  <p className="text-gray-600">{selectedReport.disasterType}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Severity Level</h4>
                  <Badge
                    className={getSeverityInfo(selectedReport.severity).color}
                  >
                    {getSeverityInfo(selectedReport.severity).label}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Status</h4>
                  <Badge
                    className={getStatusColor(selectedReport?.status as string)}
                  >
                    {(selectedReport.status
                      ?.charAt(0)
                      .toUpperCase() as string) +
                      selectedReport.status?.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Reported Date</h4>
                  <p className="text-gray-600">
                    {new Date(
                      selectedReport?.createdAt as string
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Situation Description
                </h4>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Resources Needed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.resourcesNeeded.map((resource, index) => (
                    <Badge key={index} variant="secondary">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

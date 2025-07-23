"use client";
import React, { useState, useTransition, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Search,
  Pencil,
} from "lucide-react";
import { DisasterReport, SEVERITY_LEVELS } from "@/lib/types";
import DisasterReportForm from "./disaster-report-form";
import {
  updateDisasterReportStatus,
  getDisasterReports,
} from "../api/disaster";
import Pagination from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

export default function DisasterReportsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for data and loading
  const [reports, setReports] = useState<DisasterReport[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State for dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<DisasterReport | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  // Get current filter values from URL
  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const severity = searchParams.get("severity") || "all";
  const status = searchParams.get("status") || "all";
  const perPage = 10;

  // Local filter state initialized from URL
  const [searchTerm, setSearchTerm] = useState(search);
  const [severityFilter, setSeverityFilter] = useState(severity);
  const [statusFilter, setStatusFilter] = useState(status);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params: any = {
          page,
          perPage,
        };

        // Only add parameters if they have values
        if (search) params.search = search;
        if (severity !== "all") params.severity = severity;
        if (status !== "all") params.status = status;

        const { reports, totalCount } = await getDisasterReports(params);
        setReports(reports);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching disaster reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, search, severity, status]);

  // Helper function to create search params
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "" || value === "all") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Navigation helper
  const navigateWithFilters = useCallback(
    (updates: Record<string, string | number | null>) => {
      const queryString = createQueryString(updates);
      const url = pathname + (queryString ? `?${queryString}` : "");

      // Use shallow routing to avoid full page refresh
      router.push(url, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / perPage);

  // Handler functions
  const handlePageChange = (newPage: number) => {
    navigateWithFilters({ page: newPage > 1 ? newPage : null });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithFilters({
      page: null, // Reset to page 1
      search: searchTerm || null,
    });
  };

  const handleSeverityFilterChange = (value: string) => {
    setSeverityFilter(value);
    navigateWithFilters({
      page: null, // Reset to page 1
      severity: value === "all" ? null : value,
    });
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    navigateWithFilters({
      page: null, // Reset to page 1
      status: value === "all" ? null : value,
    });
  };

  const handleEditClick = (report: DisasterReport) => {
    setCurrentReport(report);
    setEditDialogOpen(true);
  };

  const handleViewClick = (report: DisasterReport) => {
    setCurrentReport(report);
    setViewDialogOpen(true);
  };

  const handleStatusUpdate = async (
    reportId: string,
    newStatus: DisasterReport["status"]
  ) => {
    startTransition(async () => {
      try {
         await updateDisasterReportStatus(reportId, newStatus);
        setReports((prev) =>
          prev.map((r) =>
            r._id === reportId ? { ...r, status: newStatus } : r
          )
        );
        router.refresh();
      } catch (error) {
        console.error("Failed to update status");
      }
    });
  };

  const handleFormSuccess = () => {
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
    setCurrentReport(null);
    router.refresh();
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm("");
    setSeverityFilter("all");
    setStatusFilter("all");
    router.push(pathname, { scroll: false });
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
      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by location or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          <div className="flex gap-4">
            <Select
              value={severityFilter}
              onValueChange={handleSeverityFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                {SEVERITY_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="responding">Responding</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Filters Button */}
            {(searchTerm ||
              severityFilter !== "all" ||
              statusFilter !== "all") && (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}

            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Report Disaster
            </Button>
          </div>
        </div>

        {/* Show active filters */}
        {(searchTerm || severityFilter !== "all" || statusFilter !== "all") && (
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {severityFilter !== "all" && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                Severity: {getSeverityInfo(severityFilter).label}
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Status: {statusFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {!isLoading && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {reports.length} of {totalCount} reports
          {page > 1 && ` (Page ${page} of ${totalPages})`}
        </div>
      )}

      {/* Table Section */}
      {!isLoading && (
        <div className="rounded-md border mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No disaster reports found
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => {
                  const severityInfo = getSeverityInfo(report.severity);
                  return (
                    <TableRow key={report._id}>
                      <TableCell className="font-medium">
                        {report.address?.label || "N/A"}
                      </TableCell>
                      <TableCell>{report.disasterType}</TableCell>
                      <TableCell>
                        <Badge className={severityInfo.color}>
                          {severityInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewClick(report)}
                              className="flex items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditClick(report)}
                              className="flex items-center"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {report.status !== "resolved" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(report._id, "verified")
                                  }
                                  disabled={report.status === "verified"}
                                >
                                  Mark as Verified
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(report._id, "responding")
                                  }
                                  disabled={report.status === "responding"}
                                >
                                  Mark as Responding
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(report._id, "resolved")
                                  }
                                >
                                  Mark as Resolved
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination Section */}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Create Report Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report New Disaster</DialogTitle>
          </DialogHeader>
          <DisasterReportForm
            mode="create"
            onSuccess={handleFormSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Report Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Disaster Report</DialogTitle>
          </DialogHeader>
          <DisasterReportForm
            mode="edit"
            disaster={currentReport}
            onSuccess={handleFormSuccess}
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
          {currentReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    {currentReport.address?.label || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Disaster Type</h4>
                  <p className="text-gray-600">{currentReport.disasterType}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Severity Level</h4>
                  <Badge
                    className={getSeverityInfo(currentReport.severity).color}
                  >
                    {getSeverityInfo(currentReport.severity).label}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Status</h4>
                  <Badge className={getStatusColor(currentReport.status)}>
                    {currentReport.status.charAt(0).toUpperCase() +
                      currentReport.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Reported Date</h4>
                  <p className="text-gray-600">
                    {new Date(currentReport.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Situation Description
                </h4>
                <p className="text-gray-600">{currentReport.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Resources Needed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentReport.resourcesNeeded.map((resource, index) => (
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

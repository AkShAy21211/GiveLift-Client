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
import { MoreHorizontal, Pencil, Trash2, Plus, Search } from "lucide-react";
import { deactivateUser, restoreUser, getUsers } from "../api/coordinator";
import CoordinatorForm from "./coordinator-form";
import { User } from "@/lib/types";
import Pagination from "@/components/ui/pagination";

export default function CoordinatorsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for data and loading
  const [coordinators, setCoordinators] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State for dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [currentCoordinator, setCurrentCoordinator] = useState<User | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  // Get current filter values from URL
  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const isActiveParam = searchParams.get("isActive");
  const district = searchParams.get("district") || "all";
  const perPage = 10;

  // Properly handle isActive parameter
  const isActive =
    isActiveParam === "true"
      ? true
      : isActiveParam === "false"
      ? false
      : undefined;

  // Local filter state initialized from URL
  const [searchTerm, setSearchTerm] = useState(search);
  const [statusFilter, setStatusFilter] = useState(
    isActiveParam === "true"
      ? "true"
      : isActiveParam === "false"
      ? "false"
      : "all"
  );
  const [districtFilter, setDistrictFilter] = useState(district);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params: any = {
          page,
          perPage,
          role: "district_coordinator",
        };

        // Only add parameters if they have values
        if (search) params.search = search;
        if (isActive !== undefined) params.isActive = isActive;
        if (district && district !== "all") params.district = district;

        const { users, totalCount } = await getUsers(params);
        setCoordinators(users);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching coordinators:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, search, isActive, district]);

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

  // Extract unique districts for filter
  const districts = Array.from(
    new Set(coordinators.map((c) => c.address?.district).filter(Boolean))
  );

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

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    navigateWithFilters({
      page: null, // Reset to page 1
      isActive: value === "all" ? null : value, // Fixed: was using 'status' instead of 'isActive'
    });
  };

  const handleDistrictFilterChange = (value: string) => {
    setDistrictFilter(value);
    navigateWithFilters({
      page: null, // Reset to page 1
      district: value === "all" ? null : value,
    });
  };

  const handleEditClick = (coordinator: User) => {
    setCurrentCoordinator(coordinator);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (coordinator: User) => {
    setCurrentCoordinator(coordinator);
    setDeleteDialogOpen(true);
  };

  const handleRestoreClick = (coordinator: User) => {
    setCurrentCoordinator(coordinator);
    setRestoreDialogOpen(true);
  };

  const handleSoftDelete = async () => {
    if (!currentCoordinator) return;

    startTransition(async () => {
      try {
        await deactivateUser(currentCoordinator._id);
        setCoordinators((prev) =>
          prev.map((c) =>
            c._id === currentCoordinator._id
              ? { ...c, isActive: false, isDeleted: true }
              : c
          )
        );
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to deactivate coordinator");
      }
    });
  };

  const handleRestore = async () => {
    if (!currentCoordinator) return;

    startTransition(async () => {
      try {
        await restoreUser(currentCoordinator._id);
        setCoordinators((prev) =>
          prev.map((c) =>
            c._id === currentCoordinator._id
              ? { ...c, isActive: true, isDeleted: false }
              : c
          )
        );
        setRestoreDialogOpen(false);
      } catch (error) {
        console.error("Failed to activate coordinator");
      }
    });
  };

  const handleFormSuccess = () => {
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
    setCurrentCoordinator(null);
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDistrictFilter("all");
    router.push(pathname, { scroll: false });
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
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          <div className="flex gap-4">
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={districtFilter}
              onValueChange={handleDistrictFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district as string}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Filters Button */}
            {(searchTerm ||
              statusFilter !== "all" ||
              districtFilter !== "all") && (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}

            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>

        {/* Show active filters */}
        {(searchTerm || statusFilter !== "all" || districtFilter !== "all") && (
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                Status: {statusFilter === "true" ? "Active" : "Inactive"}
              </span>
            )}
            {districtFilter !== "all" && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                District: {districtFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {!isLoading && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {coordinators.length} of {totalCount} coordinators
          {page > 1 && ` (Page ${page} of ${totalPages})`}
        </div>
      )}

      {/* Table Section */}
      {!isLoading && (
        <div className="rounded-md border mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coordinators.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No coordinators found
                  </TableCell>
                </TableRow>
              ) : (
                coordinators.map((coordinator) => (
                  <TableRow key={coordinator._id}>
                    <TableCell className="font-medium">
                      {coordinator.name}
                    </TableCell>
                    <TableCell>{coordinator.email}</TableCell>
                    <TableCell>{coordinator.phone}</TableCell>
                    <TableCell>
                      {coordinator.address?.district || "N/A"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          coordinator.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {coordinator.isActive ? "Active" : "Inactive"}
                      </span>
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
                            onClick={() => handleEditClick(coordinator)}
                            className="flex items-center"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {coordinator.isDeleted ? (
                            <DropdownMenuItem
                              onClick={() => handleRestoreClick(coordinator)}
                              className="flex items-center text-green-600"
                              disabled={coordinator.isActive}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Restore
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(coordinator)}
                              className="flex items-center text-red-600"
                              disabled={!coordinator.isActive}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
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

      {/* Dialogs remain the same */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent
          className="max-w-2xl"
          aria-describedby="Create a new coordinator"
        >
          <DialogHeader>
            <DialogTitle>Create New Coordinator</DialogTitle>
          </DialogHeader>
          <CoordinatorForm
            mode="create"
            onSuccess={handleFormSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent
          className="max-w-2xl"
          aria-describedby="Edit an existing coordinator"
        >
          <DialogHeader>
            <DialogTitle>Edit Coordinator</DialogTitle>
          </DialogHeader>
          <CoordinatorForm
            mode="edit"
            coordinator={currentCoordinator}
            onSuccess={handleFormSuccess}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent aria-describedby="Delete an existing coordinator">
          <DialogHeader>
            <DialogTitle>Deactivate Coordinator</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to deactivate {currentCoordinator?.name}?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This coordinator will be marked as inactive but can be restored
              later.
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSoftDelete}
              disabled={isPending}
            >
              {isPending ? "Deactivating..." : "Deactivate"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogContent aria-describedby="Restore an existing coordinator">
          <DialogHeader>
            <DialogTitle>Restore Coordinator</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to restore {currentCoordinator?.name}?</p>
            <p className="text-sm text-gray-500 mt-2">
              This coordinator will be marked as active again.
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setRestoreDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleRestore}
              disabled={isPending}
            >
              {isPending ? "Restoring..." : "Restore"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

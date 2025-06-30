"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Coordinator,
  deactivateCoordinator,
  restoreCoordinator,
} from "./actions";
import CoordinatorForm from "./coordinator-form";

interface CoordinatorsClientProps {
  initialCoordinators: Coordinator[];
}

export default function CoordinatorsClient({
  initialCoordinators,
}: CoordinatorsClientProps) {
  const [coordinators, setCoordinators] =
    useState<Coordinator[]>(initialCoordinators);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [currentCoordinator, setCurrentCoordinator] =
    useState<Coordinator | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEditClick = (coordinator: Coordinator) => {
    setCurrentCoordinator(coordinator);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (coordinator: Coordinator) => {
    setCurrentCoordinator(coordinator);
    setDeleteDialogOpen(true);
  };

  const handleRestoreClick = (coordinator: Coordinator) => {
    setCurrentCoordinator(coordinator);
    setRestoreDialogOpen(true);
  };
  const handleSoftDelete = async () => {
    if (!currentCoordinator) return;

    startTransition(async () => {
      try {
        const result = await deactivateCoordinator(currentCoordinator._id);

        if (result.success) {
          // Optimistically update the UI
          setCoordinators((prev) =>
            prev.map((c) =>
              c._id === currentCoordinator._id ? { ...c, isActive: false } : c
            )
          );
          toast.success(result.message);
          setDeleteDialogOpen(false);
          router.refresh(); // Refresh server data
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to deactivate coordinator");
      }
    });
  };

  const handleRestore = async () => {
    if (!currentCoordinator) return;

    startTransition(async () => {
      try {
        const result = await restoreCoordinator(currentCoordinator._id);

        if (result.success) {
          // Optimistically update the UI
          setCoordinators((prev) =>
            prev.map((c) =>
              c._id === currentCoordinator._id ? { ...c, isActive: true } : c
            )
          );

          toast.success(result.message);
          setRestoreDialogOpen(false);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to activate coordinator");
      }
    });
  };

  const handleFormSuccess = () => {
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
    setCurrentCoordinator(null);
    router.refresh(); // Refresh to get updated data from server
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Coordinator
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>District</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coordinators.map((coordinator) => (
              <TableRow key={coordinator._id}>
                <TableCell className="font-medium">
                  {coordinator.name}
                </TableCell>
                <TableCell>{coordinator.email}</TableCell>
                <TableCell>{coordinator.phone}</TableCell>
                <TableCell>{coordinator.district || "N/A"}</TableCell>
                <TableCell>
                  {(coordinator.state as any)?.name || "N/A"}
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Coordinator Dialog */}
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

      {/* Edit Coordinator Dialog */}
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

      {/* Delete Dialog */}
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
        <DialogContent aria-describedby="Delete an existing coordinator">
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

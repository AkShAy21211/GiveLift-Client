"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { getAllDisasters } from "@/lib/api/disaster";
import { Disaster, SERVIRITY } from "@/lib/types";
import {
  TableRowSkeleton,
} from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 5;

function Disasters() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [disasters, setDisasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname().split("/").shift();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDisasters();
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  // fetch diasters by pagination
  async function fetchDisasters() {
    setIsLoading(true);
    try {
      const response = await getAllDisasters(ITEMS_PER_PAGE, currentPage);
      setIsLoading(false);
      setTotalPages(response.data.totalPages);
      setDisasters(response.data.disasters);
      console.log(response);
    } catch (error) {
      console.error("Error fetching disasters:", error);
    }
  }

  return (
    <div className="p-20 md:p-6">
      <h2 className="text-xl font-bold mb-4">
        {" "}
        <span className="text-gray-500">Admin</span> /
        <span className="text-gray-900"> Disaster</span> Reports
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disasters.length && !isLoading ? (
            disasters.map((disaster: Disaster) => (
              <TableRow key={disaster._id}>
                <TableCell>{disaster.title}</TableCell>
                <TableCell>{disaster.type}</TableCell>
                <TableCell
                  className={`${
                    disaster.severity.toLowerCase() === SERVIRITY.LOW
                      ? "text-yellow-400"
                      : disaster.severity.toLowerCase() === SERVIRITY.MEDIUM
                      ? "text-orange-400"
                      : disaster.severity.toLowerCase() === SERVIRITY.HIGH
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {disaster.severity}
                </TableCell>
                <TableCell>
                  {disaster.location.city}, {disaster.location.district} -{" "}
                  {disaster.location.pinCode}
                </TableCell>
                <TableCell>
                  {disaster.status ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Resolved</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(disaster.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRowSkeleton />
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default Disasters;

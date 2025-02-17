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
import { User } from "@/lib/types";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { getCoordinators } from "@/lib/api/admin";
import Image from "next/image";

const ITEMS_PER_PAGE = 5;

function Coordinators() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [coordinators, setCoordinators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCoordinators();
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  // fetch diasters by pagination
  async function fetchCoordinators() {
    setIsLoading(true);
    try {
      const response = await getCoordinators(currentPage, ITEMS_PER_PAGE);
      setIsLoading(false);
      setTotalPages(response.data.totalPages);
      setCoordinators(response.data.data);
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
        <span className="text-gray-900"> Disaster</span> Coordinators
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>District</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Pincode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coordinators.length && !isLoading ? (
            coordinators.map((coordinator: User) => (
              <TableRow key={coordinator._id}>
                <TableCell>
                  <Image
                    className="object-cover rounded-full border-2 border-gray-200"
                    alt={coordinator.name}
                    width={30}
                    height={30}
                    src={
                      coordinator.avatar ||
                      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                    }
                  />
                </TableCell>

                <TableCell>{coordinator.name}</TableCell>
                <TableCell>{coordinator.email}</TableCell>
                <TableCell>{coordinator.phone}</TableCell>
                <TableCell>{coordinator.address.district}</TableCell>
                <TableCell>{coordinator.address.city}</TableCell>
                <TableCell>{coordinator.address.pincode}</TableCell>
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

export default Coordinators;

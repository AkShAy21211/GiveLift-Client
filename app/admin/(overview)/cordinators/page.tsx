"use client";
import CreateCordinatorModal from "@/app/components/modal/CreateCordinatorModal";
import Pagination from "@/app/components/Pagination";
import TableSkeleton from "@/app/components/skleton/TableSkeleton";
import {
  createCoordinator,
  CreateCordinatorType,
  getCoordinators,
} from "@/libs/api/admin";
import { USER_ROLE } from "@/libs/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CordinatorTable = dynamic(
  () => import("../../../components/tablle/Table"),
  {
    ssr: false,
    loading: () => <TableSkeleton />,
  }
);

function Cordinators() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [coordinators, setCoordinators] = useState<Array<CreateCordinatorType>>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toggleModal = () => setIsOpen(!isOpen);

  const lables = [
    "Id",
    "Avatar",
    "Name",
    "Email",
    "Phone",
    "District",
    "City",
    "Pincode",
  ];

  useEffect(() => {
    fetchCoordinators();
  }, [page]);
  const onSubmit = async (userData: CreateCordinatorType) => {
    try {
      userData.role = USER_ROLE.COORDINATOR;
      const response = await createCoordinator(userData);
      toast.success(response.data.message);
      return;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
      return;
    }
  };

  const fetchCoordinators = async () => {
    try {
      const response = await getCoordinators(page,5);
      console.log(response.data);
      
      setCoordinators(response.data.data);
      setTotalPages(response.data.totalPages);
      return;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold inline-block">Cordinators</h2>
      <Link
        href={""}
        onClick={toggleModal}
        className="float-end bg-blue-600 text-white p-2 rounded-md "
      >
        Create
      </Link>
      <div className="cordinator-table  ">
        <CordinatorTable label={lables} data={coordinators} page={page}/>
        <CreateCordinatorModal
          isOpen={isOpen}
          onClose={toggleModal}
          onSubmit={onSubmit}
        />
      </div>
      <Pagination totalPages={totalPages} setPage={setPage} page={page}/>
    </div>
  );
}

export default Cordinators;

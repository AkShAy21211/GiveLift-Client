import { CustomTableLoading } from "@/components/ui/CustomSkleton";
import React from "react";

function loading() {
  return (
    <CustomTableLoading
      columns={["Name", "Role", "Email", "Last Login", "Status"]}
      rows={8}
      title="Coordinators"
    />
  );
}

export default loading;

// app/disasters/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import DisasterCard from "../components/DisasterCard";
import DisasterFilters from "../components/DisasterFilters";
import NoDisastersFound from "../components/NoDisasterFound";
import { DisasterReport } from "@/lib/types";
import { getDisasters } from "../api";

const DisasterListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [disasters, setDisasters] = useState<DisasterReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await getDisasters();
      setDisasters(response?.data as DisasterReport[]);

      setLoading(false);
    };

    fetchDisasters();
  }, []);

  const filteredDisasters = disasters.filter((disaster) => {
    const matchesSearch =
      disaster.address.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.disasterType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      filterSeverity === "all" || disaster.severity === filterSeverity;
    const matchesType =
      filterType === "all" || disaster.disasterType === filterType;

    return matchesSearch && matchesSeverity && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading disasters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Disaster Reports</h1>
          <p className="text-gray-600 mt-2">
            Track and monitor ongoing disasters in your area
          </p>
        </div>
        <Link href="/report-disaster">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Report New Disaster
          </Button>
        </Link>
      </div>

      <DisasterFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterSeverity={filterSeverity}
        setFilterSeverity={setFilterSeverity}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <div className="space-y-4">
        {filteredDisasters.map((disaster) => (
          <DisasterCard key={disaster._id} disaster={disaster} />
        ))}
      </div>

      {filteredDisasters.length === 0 && !loading && <NoDisastersFound />}
    </div>
  );
};

export default DisasterListPage;

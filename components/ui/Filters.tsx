"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  type: "search" | "select";
  key: string;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: string;
}

interface DataTableFiltersProps {
  filters: FilterConfig[];
  searchPlaceholder?: string;
  createButtonLabel?: string;
  onCreateClick?: () => void;
}

export function DataTableFilters({
  filters,
  searchPlaceholder = "Search...",
  createButtonLabel,
  onCreateClick,
}: DataTableFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      router.push(url, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  const handleSearch = (e: React.FormEvent, key: string) => {
    e.preventDefault();
    const value = (e.currentTarget as HTMLFormElement).elements.namedItem(key) as HTMLInputElement;
    navigateWithFilters({
      page: null, // Reset to page 1
      [key]: value?.value || null,
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    navigateWithFilters({
      page: null, // Reset to page 1
      [key]: value === "all" ? null : value,
    });
  };

  const resetFilters = () => {
    const params: Record<string, null> = {};
    filters.forEach(filter => {
      params[filter.key] = null;
    });
    navigateWithFilters(params);
  };

  // Check if any filters are active
  const hasActiveFilters = filters.some(filter => {
    const value = searchParams.get(filter.key);
    return value && value !== "all" && value !== filter.defaultValue;
  });

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search input (if any filter is of type 'search') */}
        {filters.some(f => f.type === "search") && (
          <form 
            onSubmit={(e) => handleSearch(e, filters.find(f => f.type === "search")!.key)}
            className="flex-1"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                name={filters.find(f => f.type === "search")!.key}
                defaultValue={searchParams.get(filters.find(f => f.type === "search")!.key) || ""}
                className="pl-10"
              />
            </div>
          </form>
        )}

        <div className="flex gap-4">
          {/* Select filters */}
          {filters
            .filter(f => f.type === "select")
            .map(filter => (
              <Select
                key={filter.key}
                value={searchParams.get(filter.key) || filter.defaultValue || "all"}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}s</SelectItem>
                  {filter.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          )}

          {createButtonLabel && onCreateClick && (
            <Button onClick={onCreateClick}>
              <Plus className="mr-2 h-4 w-4" />
              {createButtonLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Show active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {filters.map(filter => {
            const value = searchParams.get(filter.key);
            if (!value || value === "all") return null;

            return (
              <span key={filter.key} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {filter.label}: {filter.options?.find(o => o.value === value)?.label || value}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
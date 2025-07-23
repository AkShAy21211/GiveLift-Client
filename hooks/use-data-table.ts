import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";

interface UseDataTableOptions<T> {
  fetchData: (params: any) => Promise<{
    data: T[];
    totalCount: number;
    totalPages?: number;
    currentPage?: number;
  }>;
  filters: {
    key: string;
    defaultValue?: string;
  }[];
  perPage?: number;
}

export function useDataTable<T>({
  fetchData,
  filters,
  perPage = 10,
}: UseDataTableOptions<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get current page from URL or default to 1
  const page = Number(searchParams.get("page") || "1");

  // Memoize the current filter values to prevent unnecessary re-renders
  const currentFilters = useMemo(() => {
    const params: Record<string, string> = {};
    filters.forEach(filter => {
      const value = searchParams.get(filter.key);
      if (value && value !== "all") {
        params[filter.key] = value;
      }
    });
    return params;
  }, [filters, searchParams]);

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

  // Stable navigation helper
  const navigateWithFilters = useCallback(
    (updates: Record<string, string | number | null>) => {
      const queryString = createQueryString(updates);
      const url = pathname + (queryString ? `?${queryString}` : "");
      router.push(url, { scroll: false });
    },
    [pathname, router, createQueryString]
  );

  // Fetch data when filters or page changes
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDataWithParams = async () => {
      setIsLoading(true);
      
      try {
        const params = {
          page,
          perPage,
          ...currentFilters,
        };

        const result = await fetchData({ ...params, signal });
        if (!signal.aborted) {
          setData(result.data);
          setTotalCount(result.totalCount);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchDataWithParams();

    return () => {
      controller.abort();
    };
  }, [page, currentFilters, fetchData, perPage]); // Removed searchParams from dependencies

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / perPage);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    navigateWithFilters({ page: newPage > 1 ? newPage : null });
  }, [navigateWithFilters]);

  return {
    data,
    totalCount,
    totalPages,
    currentPage: page,
    isLoading,
    handlePageChange,
    navigateWithFilters,
    createQueryString,
  };
}
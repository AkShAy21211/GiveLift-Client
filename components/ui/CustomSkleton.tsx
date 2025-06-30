import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"



// Generic Table Loading Skeleton
interface TableLoadingSkeletonProps {
  columns: string[]
  rows?: number
  showActions?: boolean
  showAddButton?: boolean
  title?: string
}

export function TableLoadingSkeleton({
  columns,
  rows = 5,
  showActions = true,
  showAddButton = true,
  title,
}: TableLoadingSkeletonProps) {
  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          {title ? (
            <h1 className="text-2xl font-bold">{title}</h1>
          ) : (
            <Skeleton className="h-8 w-48" />
          )}
        </div>
        {showAddButton && (
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </Button>
        )}
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="text-right">
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Specific Loading Components for Different Tables

// Coordinators Table Loading
export function CoordinatorsTableLoading() {
  return (
    <TableLoadingSkeleton
      columns={["Name", "Email", "Phone", "District", "State", "Status"]}
      rows={6}
      showActions={true}
      showAddButton={true}
      title="Coordinators"
    />
  )
}

// Generic Loading with Custom Columns
export function CustomTableLoading({
  columns,
  rows = 5,
  title,
}: {
  columns: string[]
  rows?: number
  title?: string
}) {
  return (
    <TableLoadingSkeleton
      columns={columns}
      rows={rows}
      showActions={true}
      showAddButton={true}
      title={title}
    />
  )
}

// Minimal Table Loading (just the table, no header)
export function MinimalTableLoading({
  columns,
  rows = 3,
}: {
  columns: string[]
  rows?: number
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full max-w-[150px]" />
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Skeleton className="h-6 w-6 rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Advanced Loading with Different Skeleton Types
export function AdvancedTableLoading({
  columns,
  rows = 5,
  title,
}: {
  columns: Array<{
    name: string
    type?: 'text' | 'email' | 'phone' | 'status' | 'date' | 'number'
  }>
  rows?: number
  title?: string
}) {
  const getSkeletonByType = (type: string = 'text') => {
    switch (type) {
      case 'email':
        return <Skeleton className="h-4 w-32" />
      case 'phone':
        return <Skeleton className="h-4 w-24" />
      case 'status':
        return <Skeleton className="h-5 w-16 rounded-full" />
      case 'date':
        return <Skeleton className="h-4 w-20" />
      case 'number':
        return <Skeleton className="h-4 w-12" />
      default:
        return <Skeleton className="h-4 w-full max-w-[180px]" />
    }
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          {title ? (
            <h1 className="text-2xl font-bold">{title}</h1>
          ) : (
            <Skeleton className="h-8 w-48" />
          )}
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      {/* Stats Cards (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-12" />
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.name}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {getSkeletonByType(column.type)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Pulse Loading Animation Alternative
export function PulseTableLoading({
  columns,
  rows = 5,
  title,
}: {
  columns: string[]
  rows?: number
  title?: string
}) {
  return (
    <div className="container mx-auto py-8 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          {title ? (
            <h1 className="text-2xl font-bold opacity-50">{title}</h1>
          ) : (
            <div className="h-8 w-48 bg-gray-200 rounded" />
          )}
        </div>
        <div className="h-9 w-32 bg-gray-200 rounded" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className="opacity-50">
                  {column}
                </TableHead>
              ))}
              <TableHead className="text-right opacity-50">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <div 
                      className="h-4 bg-gray-200 rounded" 
                      style={{ 
                        width: `${Math.random() * 60 + 40}%`,
                        animationDelay: `${rowIndex * 0.1 + colIndex * 0.05}s` 
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="h-6 w-6 bg-gray-200 rounded ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


export function DisasterReportsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
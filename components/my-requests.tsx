"use client";

import type { AdjustmentRequest, Faculty } from "@/lib/types";
import { Pill } from "@/components/kibo-ui/pill";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

function formatTime(t: string) {
  return t.slice(0, 5);
}

function formatRelativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const statusStyles: Record<
  AdjustmentRequest["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:ring-yellow-800",
  },
  approved: {
    label: "Approved",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800",
  },
};

export function MyRequestsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-44" />
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-14" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface MyRequestsProps {
  requests: AdjustmentRequest[];
  faculties: Faculty[];
}

export function MyRequests({ requests, faculties }: MyRequestsProps) {
  const facultyMap = new Map(faculties.map((f) => [f.id, f]));

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
        Your sent requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-sm text-zinc-400">No requests sent yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 dark:bg-zinc-900">
                <TableHead>To</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(({ id, target_faculty_id, day, status, requested_at, slots }) => {
                const targetFaculty = facultyMap.get(target_faculty_id);
                const { label, className } = statusStyles[status];
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium text-zinc-800 dark:text-zinc-200">
                      {targetFaculty?.name ?? `#${target_faculty_id}`}
                      <span className="ml-1.5 text-xs font-normal text-zinc-400">
                        E{target_faculty_id}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400">
                      {day}
                    </TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        Slot {slots.slot_number}
                      </span>{" "}
                      <span className="text-xs text-zinc-400">
                        {formatTime(slots.start_time)}–{formatTime(slots.end_time)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Pill className={cn("cursor-default", className)}>
                        {label}
                      </Pill>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-400">
                      {formatRelativeDate(requested_at)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

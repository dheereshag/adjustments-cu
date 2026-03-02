"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import supabase from "@/lib/db";
import type {
  Faculty,
  Slot,
  FacultyFreeSlots,
  AdjustmentRequest,
} from "@/lib/types";
import FacultySelect from "./faculty-select";
import DatePicker from "./date-picker";
import { BusySlots, BusySlotsSkeleton } from "./busy-slots";
import { ResultsTable, ResultsTableSkeleton } from "./results-table";
import { MyRequests, MyRequestsSkeleton } from "./my-requests";

const VALID_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
type DayEnum = (typeof VALID_DAYS)[number];

export default function AdjustmentFinder({
  faculties,
}: {
  faculties: Faculty[];
}) {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [busySlots, setBusySlots] = useState<Slot[]>([]);
  const [results, setResults] = useState<FacultyFreeSlots[] | null>(null);
  const [myRequests, setMyRequests] = useState<AdjustmentRequest[] | null>(
    null,
  );
  const [requestsLoading, setRequestsLoading] = useState(false);

  function fetchRequests(facultyId: number) {
    setRequestsLoading(true);
    supabase
      .from("adjustment_requests")
      .select(
        "id, target_faculty_id, day, slot_id, status, requested_at, reason, slots(slot_number, start_time, end_time)",
      )
      .eq("requested_by_faculty_id", facultyId)
      .order("requested_at", { ascending: false })
      .then(({ data, error: reqErr }) => {
        setRequestsLoading(false);
        if (!reqErr)
          setMyRequests((data ?? []) as unknown as AdjustmentRequest[]);
      });
  }

  useEffect(() => {
    if (!selectedFacultyId) {
      setMyRequests(null);
      return;
    }
    fetchRequests(parseInt(selectedFacultyId));
  }, [selectedFacultyId]);

  useEffect(() => {
    if (!selectedFacultyId || !selectedDate) return;

    const day = format(selectedDate, "EEE");

    if (!VALID_DAYS.includes(day as DayEnum)) {
      setError("Please select a weekday (Mon–Fri).");
      setResults(null);
      setBusySlots([]);
      setSelectedDay(null);
      return;
    }

    setError(null);
    setSelectedDay(day);
    fetchResults(parseInt(selectedFacultyId), day as DayEnum);
  }, [selectedFacultyId, selectedDate]);

  async function fetchResults(facultyId: number, day: DayEnum) {
    setLoading(true);
    setResults(null);
    setBusySlots([]);

    const { data: mySchedules, error: myErr } = await supabase
      .from("schedules")
      .select("slot_id")
      .eq("faculty_id", facultyId)
      .eq("day", day);

    if (myErr) {
      setError(myErr.message);
      setLoading(false);
      return;
    }

    const myBusySlotNums = (mySchedules ?? [])
      .map((r) => r.slot_id as number)
      .sort((a, b) => a - b);

    if (myBusySlotNums.length === 0) {
      setBusySlots([]);
      setResults([]);
      setLoading(false);
      return;
    }

    const { data: slotDetails, error: slotErr } = await supabase
      .from("slots")
      .select("slot_number, start_time, end_time")
      .in("slot_number", myBusySlotNums)
      .order("slot_number");

    if (slotErr) {
      setError(slotErr.message);
      setLoading(false);
      return;
    }

    setBusySlots(slotDetails ?? []);
    const slotDetailMap = new Map(
      (slotDetails ?? []).map((s) => [s.slot_number, s]),
    );

    const { data: allSchedules, error: allErr } = await supabase
      .from("schedules")
      .select("faculty_id, slot_id")
      .eq("day", day)
      .neq("faculty_id", facultyId);

    if (allErr) {
      setError(allErr.message);
      setLoading(false);
      return;
    }

    const busyMap = new Map<number, Set<number>>();
    for (const row of allSchedules ?? []) {
      if (!busyMap.has(row.faculty_id)) busyMap.set(row.faculty_id, new Set());
      busyMap.get(row.faculty_id)!.add(row.slot_id);
    }

    const out: FacultyFreeSlots[] = [];
    for (const faculty of faculties) {
      if (faculty.id === facultyId) continue;
      const theirBusy = busyMap.get(faculty.id) ?? new Set<number>();
      const freeSlots = myBusySlotNums
        .filter((s) => !theirBusy.has(s))
        .map((s) => slotDetailMap.get(s)!)
        .filter(Boolean);
      if (freeSlots.length > 0) out.push({ faculty, freeSlots });
    }

    out.sort((a, b) => b.freeSlots.length - a.freeSlots.length);
    setResults(out);
    setLoading(false);
  }

  const requestingFaculty = faculties.find(
    (f) => String(f.id) === selectedFacultyId,
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <FacultySelect
            faculties={faculties}
            onValueChange={setSelectedFacultyId}
          />
        </div>
        <DatePicker onDateChange={setSelectedDate} />
      </div>

      {(requestsLoading || myRequests !== null) && (
        <>
          {requestsLoading ? (
            <MyRequestsSkeleton />
          ) : (
            <MyRequests requests={myRequests!} faculties={faculties} />
          )}
          <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
        </>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading && (
        <div className="flex flex-col gap-6">
          <BusySlotsSkeleton />
          <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
          <ResultsTableSkeleton />
        </div>
      )}

      {results !== null && !loading && requestingFaculty && selectedDay && (
        <div className="flex flex-col gap-6">
          <BusySlots
            facultyName={requestingFaculty.name}
            day={selectedDay}
            slots={busySlots}
          />
          <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
          {busySlots.length > 0 && (
            <ResultsTable
              results={results}
              facultyName={requestingFaculty.name}
              day={selectedDay}
              requestingFacultyId={parseInt(selectedFacultyId)}
              onRequestSent={() => fetchRequests(parseInt(selectedFacultyId))}
            />
          )}
        </div>
      )}
    </div>
  );
}


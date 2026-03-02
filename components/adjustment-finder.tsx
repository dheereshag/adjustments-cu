"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import supabase from "@/lib/db";
import FacultySelect from "./faculty-select";
import DatePicker from "./date-picker";
import type { Faculty } from "@/lib/types";

type Slot = { slot_number: number; start_time: string; end_time: string };
type FacultyFreeSlots = { faculty: Faculty; freeSlots: Slot[] };

const VALID_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
type DayEnum = (typeof VALID_DAYS)[number];

function formatTime(t: string) {
  return t.slice(0, 5);
}

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

  useEffect(() => {
    if (!selectedFacultyId || !selectedDate) return;

    const day = format(selectedDate, "EEE");

    console.log("Selected day:", day);

    if (!VALID_DAYS.includes(day as DayEnum)) {
      console.warn("Selected day is not a valid weekday:", day);
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

    console.log("facultyId:", facultyId, "day:", day);

    // 1. Get the requesting faculty's busy slot numbers on that day
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

    console.log("My schedules:", mySchedules);

    const myBusySlotNums = (mySchedules ?? [])
      .map((r) => r.slot_id as number)
      .sort((a, b) => a - b);

    if (myBusySlotNums.length === 0) {
      setBusySlots([]);
      setResults([]);
      setLoading(false);
      return;
    }

    // 2. Fetch slot time details for those busy slots
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

    // 3. Get all other faculties' busy slot numbers on that day
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

    // 4. Build a busy-slot set per faculty
    const busyMap = new Map<number, Set<number>>();
    for (const row of allSchedules ?? []) {
      if (!busyMap.has(row.faculty_id)) busyMap.set(row.faculty_id, new Set());
      busyMap.get(row.faculty_id)!.add(row.slot_id);
    }

    // 5. For each other faculty, find which of the requester's busy slots
    //    they are free in — those are the candidate replacement slots
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
      <FacultySelect
        faculties={faculties}
        onValueChange={setSelectedFacultyId}
      />
      <DatePicker onDateChange={setSelectedDate} />

      {loading && (
        <p className="text-sm text-zinc-400 animate-pulse">Loading…</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {results !== null && !loading && requestingFaculty && selectedDay && (
        <div className="flex flex-col gap-6">
          {/* Requester's busy slots */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {requestingFaculty.name}&apos;s busy slots on{" "}
              <span className="text-zinc-500">{selectedDay}</span>
            </h2>
            {busySlots.length === 0 ? (
              <p className="text-sm text-zinc-400">
                No scheduled classes found.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {busySlots.map((slot) => (
                  <span
                    key={slot.slot_number}
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <span className="font-bold">Slot {slot.slot_number}</span>
                    <span className="text-zinc-400">
                      {formatTime(slot.start_time)}–{formatTime(slot.end_time)}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

          {/* Results table */}
          {busySlots.length === 0 ? null : results.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No faculty is free in any of these slots on {selectedDay}.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Available faculties on{" "}
                <span className="text-zinc-500">{selectedDay}</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Showing faculties who are free in at least one of{" "}
                {requestingFaculty.name}&apos;s busy slots.
              </p>
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                      <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Faculty
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Free in these slots
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(({ faculty, freeSlots }, idx) => (
                      <tr
                        key={faculty.id}
                        className={
                          idx % 2 === 0
                            ? "bg-white dark:bg-black"
                            : "bg-zinc-50 dark:bg-zinc-950"
                        }
                      >
                        <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">
                          {faculty.name}
                          <span className="ml-1.5 text-xs font-normal text-zinc-400">
                            E{faculty.id}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {freeSlots.map((slot) => (
                              <span
                                key={slot.slot_number}
                                className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-500/20"
                              >
                                <span>Slot {slot.slot_number}</span>
                                <span className="text-emerald-500">
                                  {formatTime(slot.start_time)}–
                                  {formatTime(slot.end_time)}
                                </span>
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

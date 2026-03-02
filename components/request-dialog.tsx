"use client";

import { useState } from "react";
import supabase from "@/lib/db";
import type { Faculty, Slot } from "@/lib/types";
import { Pill } from "@/components/kibo-ui/pill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function formatTime(t: string) {
  return t.slice(0, 5);
}

interface RequestDialogProps {
  requestingFacultyId: number;
  targetFaculty: Faculty;
  slot: Slot;
  day: string;
}

export function RequestDialog({
  requestingFacultyId,
  targetFaculty,
  slot,
  day,
}: RequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    const { error: insertErr } = await supabase
      .from("adjustment_requests")
      .insert({
        requested_by_faculty_id: requestingFacultyId,
        target_faculty_id: targetFaculty.id,
        day,
        slot_id: slot.slot_number,
        reason: reason.trim() || null,
      });

    setSubmitting(false);

    if (insertErr) {
      if (insertErr.code === "23505") {
        setError("You have already sent a request for this slot.");
      } else {
        setError(insertErr.message);
      }
      return;
    }

    setSubmitted(true);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setReason("");
        setSubmitted(false);
        setError(null);
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Pill className="cursor-pointer bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-500/20 dark:hover:bg-emerald-900">
          <span className="font-medium">Slot {slot.slot_number}</span>
          <span className="text-emerald-500">
            {formatTime(slot.start_time)}–{formatTime(slot.end_time)}
          </span>
        </Pill>
      </DialogTrigger>

      <DialogContent>
        {submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Request sent</DialogTitle>
              <DialogDescription>
                Your adjustment request has been submitted to{" "}
                <span className="font-medium text-foreground">
                  {targetFaculty.name}
                </span>{" "}
                for{" "}
                <span className="font-medium text-foreground">
                  Slot {slot.slot_number} ({formatTime(slot.start_time)}–
                  {formatTime(slot.end_time)})
                </span>{" "}
                on <span className="font-medium text-foreground">{day}</span>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request adjustment</DialogTitle>
              <DialogDescription>
                Request{" "}
                <span className="font-medium text-foreground">
                  {targetFaculty.name}
                </span>{" "}
                to cover{" "}
                <span className="font-medium text-foreground">
                  Slot {slot.slot_number} ({formatTime(slot.start_time)}–
                  {formatTime(slot.end_time)})
                </span>{" "}
                on <span className="font-medium text-foreground">{day}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Reason{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Lab session requires subject expert"
                rows={3}
                className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Sending…" : "Send request"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

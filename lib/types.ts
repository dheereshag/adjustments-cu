export type Faculty = {
  id: number;
  name: string;
};

export type Slot = {
  slot_number: number;
  start_time: string;
  end_time: string;
};

export type FacultyFreeSlots = {
  faculty: Faculty;
  freeSlots: Slot[];
};

export type AdjustmentRequest = {
  id: number;
  target_faculty_id: number;
  day: string;
  slot_id: number;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
  reason: string | null;
  slots: Pick<Slot, "slot_number" | "start_time" | "end_time">;
};

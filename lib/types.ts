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

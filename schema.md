# Adjustment Finder — Database Schema

## Overview

A system to manage faculty timetables, identify free slots, and track adjustment requests. Built on **PostgreSQL**.

---

## Tables

### 1. `faculties`
Stores faculty/teacher information.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `INT` | PRIMARY KEY | Employee code, e.g. `19842` |
| `name` | `VARCHAR(100)` | NOT NULL | Full name |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT NOW() | |

---

### 2. `slots`
The 8 fixed daily time slots. Seeded once, never changes.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `slot_number` | `SMALLINT` | PRIMARY KEY | 1–8 |
| `start_time` | `TIME` | NOT NULL | e.g. `09:30` |
| `end_time` | `TIME` | NOT NULL | e.g. `10:20` |

**Seed data:**
```
id=1  09:30–10:20
id=2  10:20–11:10
id=3  11:20–12:10
id=4  12:10–13:00
id=5  13:05–13:55
id=6  13:55–14:45
id=7  14:45–15:35
id=8  15:35–16:25
```

---

### 3. `schedules`
The regular (fixed) timetable for each faculty — what slots they are already occupied in.

**Enums used:**
- `day_enum`: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`
- `block_enum`: `D2`, `D3`, `D4`
- `group_enum`: `A`, `B`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY | |
| `faculty_id` | `INT` | FK → `faculties.id`, NOT NULL | |
| `day` | `day_enum` | NOT NULL | |
| `slot_id` | `SMALLINT` | FK → `slots.slot_number`, NOT NULL | The occupied slot (one row per slot) |
| `class_name` | `VARCHAR(50)` | | e.g. `23AML-3` |
| `block_name` | `block_enum` | NOT NULL | |
| `room_number` | `SMALLINT` | | e.g. `411` |
| `course_code` | `VARCHAR(10)` | | e.g. `23CSP-378` |
| `course_name` | `VARCHAR(10)` | | e.g. `CC-II` |
| `group` | `group_enum` | NOT NULL | |

**Unique constraint:** `(faculty_id, day, slot_id)` — a faculty cannot be in two places at the same slot.

---

### 4. `adjustment_requests`
Tracks who requested which free slot of a faculty, and for what purpose.

**Enums used:**
- `day_enum`: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`
- `request_status_enum`: `pending`, `approved`, `rejected`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY | |
| `requested_by_faculty_id` | `INT` | FK → `faculties.id`, NOT NULL | Who is requesting |
| `target_faculty_id` | `INT` | FK → `faculties.id`, NOT NULL | Whose free slot is being requested |
| `day` | `day_enum` | NOT NULL | |
| `slot_id` | `SMALLINT` | FK → `slots.slot_number`, NOT NULL | The free slot being requested |
| `reason` | `TEXT` | | Optional reason/note |
| `remarks` | `TEXT` | NULLABLE | Admin/resolver remarks |
| `status` | `request_status_enum` | DEFAULT `pending` | |
| `requested_at` | `TIMESTAMPTZ` | DEFAULT NOW() | |
| `resolved_at` | `TIMESTAMPTZ` | NULLABLE | When approved/rejected |

**Unique constraint:** `(requested_by_faculty_id, target_faculty_id, day, slot_id)` — a faculty cannot submit duplicate requests for the same target faculty's slot on the same day.

---

## Relationships

```
faculties ──< schedules              (faculty_id → faculties.id)
faculties ──< adjustment_requests    (requested_by_faculty_id → faculties.id)
faculties ──< adjustment_requests    (target_faculty_id → faculties.id)
slots     ──< schedules              (slot_id → slots.slot_number)
slots     ──< adjustment_requests    (slot_id → slots.slot_number)
```

---

## Notes

- Each row in `schedules` represents one occupied slot. A double-slot class (e.g. slots 3 & 4) is stored as two separate rows with the same class/course details.
- The `slots` table is static — seed it once from `slots.js`.
- Faculty timetables (the `schedules` table) can be bulk-imported from per-faculty CSVs like `anchita.csv`.
- All enums (`day_enum`, `block_enum`, `group_enum`, `request_status_enum`) should be defined at the DB level before creating tables.

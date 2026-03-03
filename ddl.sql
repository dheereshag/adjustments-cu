CREATE TABLE IF NOT EXISTS faculties (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create Enums
CREATE TYPE day_enum AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri');
CREATE TYPE block_enum AS ENUM ('D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8');
CREATE TYPE group_enum AS ENUM ('A', 'B');
CREATE TYPE request_status_enum AS ENUM ('pending', 'approved', 'rejected');

-- Create slots table
CREATE TABLE IF NOT EXISTS slots (
    slot_number SMALLINT PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Seed data for slots
INSERT INTO slots (slot_number, start_time, end_time) VALUES
(1, '09:30', '10:20'),
(2, '10:20', '11:10'),
(3, '11:20', '12:10'),
(4, '12:10', '13:00'),
(5, '13:05', '13:55'),
(6, '13:55', '14:45'),
(7, '14:45', '15:35'),
(8, '15:35', '16:25');

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculties(id),
    day day_enum NOT NULL,
    slot_id SMALLINT NOT NULL REFERENCES slots(slot_number),
    class_name VARCHAR(50),
    block_name block_enum NOT NULL,
    room_number VARCHAR(5),
    course_code VARCHAR(10) REFERENCES courses(code),
    "group" group_enum NOT NULL,
    UNIQUE(faculty_id, day, slot_id)
);

-- Create adjustment_requests table
CREATE TABLE IF NOT EXISTS adjustment_requests (
    id SERIAL PRIMARY KEY,
    requested_by_faculty_id INT NOT NULL REFERENCES faculties(id),
    target_faculty_id INT NOT NULL REFERENCES faculties(id),
    day day_enum NOT NULL,
    slot_id SMALLINT NOT NULL REFERENCES slots(slot_number),
    reason TEXT,
    remarks TEXT,
    status request_status_enum DEFAULT 'pending',
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    UNIQUE (requested_by_faculty_id, target_faculty_id, day, slot_id)
);

-- Trigger: when a request is approved, auto-reject all other pending requests
-- for the same (target_faculty_id, day, slot_id) with an explanatory remark.

CREATE OR REPLACE FUNCTION reject_conflicting_requests()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status IS DISTINCT FROM 'approved' THEN
    UPDATE adjustment_requests
    SET
      status      = 'rejected',
      remarks     = 'Slot already taken — another request for this slot was approved.',
      resolved_at = NOW()
    WHERE
      target_faculty_id = NEW.target_faculty_id
      AND day           = NEW.day
      AND slot_id       = NEW.slot_id
      AND status        = 'pending'
      AND id            <> NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reject_conflicting_requests
AFTER UPDATE ON adjustment_requests
FOR EACH ROW
EXECUTE FUNCTION reject_conflicting_requests();

-- Prevent inserting a new request for a slot that already has an approved request.
CREATE OR REPLACE FUNCTION block_request_on_approved_slot()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM adjustment_requests
    WHERE target_faculty_id = NEW.target_faculty_id
      AND day               = NEW.day
      AND slot_id           = NEW.slot_id
      AND status            = 'approved'
  ) THEN
    RAISE EXCEPTION 'slot_already_taken'
      USING HINT = 'This slot has already been approved for another faculty.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_block_request_on_approved_slot
BEFORE INSERT ON adjustment_requests
FOR EACH ROW
EXECUTE FUNCTION block_request_on_approved_slot();

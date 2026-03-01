-- Create Enums
CREATE TYPE day_enum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
CREATE TYPE block_enum AS ENUM ('D2', 'D3');
CREATE TYPE group_enum AS ENUM ('A', 'B');
CREATE TYPE request_status_enum AS ENUM ('pending', 'approved', 'rejected');

-- Create slots table
CREATE TABLE slots (
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
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculties(id),
    day day_enum NOT NULL,
    slot_id SMALLINT NOT NULL REFERENCES slots(slot_number),
    slot_id_2 SMALLINT REFERENCES slots(slot_number),
    class_name VARCHAR(50),
    block_name block_enum NOT NULL,
    room_number SMALLINT,
    course_code VARCHAR(10),
    course_name VARCHAR(10),
    "group" group_enum NOT NULL,
    UNIQUE(faculty_id, day, slot_id)
);

-- Create adjustment_requests table
CREATE TABLE adjustment_requests (
    id SERIAL PRIMARY KEY,
    requested_by_faculty_id INT NOT NULL REFERENCES faculties(id),
    target_faculty_id INT NOT NULL REFERENCES faculties(id),
    day day_enum NOT NULL,
    slot_id SMALLINT NOT NULL REFERENCES slots(slot_number),
    reason TEXT,
    remarks TEXT,
    status request_status_enum DEFAULT 'pending',
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

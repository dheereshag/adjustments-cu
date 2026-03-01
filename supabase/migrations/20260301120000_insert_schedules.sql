-- Insert Anchita into faculties (if not already present)
INSERT INTO faculties (id, name) VALUES (19078, 'Anchita');

-- Insert schedules for Anchita (faculty_id = 19078)
INSERT INTO schedules (faculty_id, day, slot_id, slot_id_2, class_name, block_name, room_number, course_code, course_name, "group") VALUES
(19078, 'Monday',    1, 2, '23AML-3', 'D2', 411, '23CSP-378', 'CC-II', 'A'),
(19078, 'Monday',    7, 8, '23AML-4', 'D2', 307, '23CSP-378', 'CC-II', 'A'),
(19078, 'Tuesday',   3, 4, '23AML-3', 'D2', 307, '23CSP-378', 'CC-II', 'B'),
(19078, 'Tuesday',   7, 8, '23AML-4', 'D2', 307, '23CSP-378', 'CC-II', 'B'),
(19078, 'Wednesday', 1, 2, '23AML-4', 'D2', 307, '23CSP-378', 'CC-II', 'B'),
(19078, 'Wednesday', 3, 4, '23AML-3', 'D2', 411, '23CSP-378', 'CC-II', 'A'),
(19078, 'Wednesday', 6, 7, '23AML-2', 'D2', 413, '23CSP-378', 'CC-II', 'B'),
(19078, 'Thursday',  3, 4, '23AML-2', 'D2', 308, '23CSP-378', 'CC-II', 'A'),
(19078, 'Thursday',  7, 8, '23AML-2', 'D2', 409, '23CSP-378', 'CC-II', 'B'),
(19078, 'Friday',    1, 2, '23AML-2', 'D2', 413, '23CSP-378', 'CC-II', 'A'),
(19078, 'Friday',    3, 4, '23AML-4', 'D2', 318, '23CSP-378', 'CC-II', 'A'),
(19078, 'Friday',    6, 7, '23AML-3', 'D2', 409, '23CSP-378', 'CC-II', 'B');

-- Insert schedules for Dheeresh Agarwal (faculty_id = 19842)
INSERT INTO schedules (faculty_id, day, slot_id, slot_id_2, class_name, block_name, room_number, course_code, course_name, "group") VALUES
(19842, 'Monday',    3, 4, '24BDS-1',      'D3', 301, '24CSP-370', 'FS-1', 'A'),
(19842, 'Monday',    7, 8, '24AIT_NTPP-1', 'D3', 305, '24CSP-370', 'FS-1', 'B'),
(19842, 'Tuesday',   6, 7, '24AIT_NTPP-1', 'D3', 205, '24CSP-370', 'FS-1', 'A'),
(19842, 'Wednesday', 3, 4, '24AIT_NTPP-1', 'D3', 307, '24CSP-370', 'FS-1', 'B'),
(19842, 'Wednesday', 6, 7, '24BDS-1',      'D3', 301, '24CSP-370', 'FS-1', 'A'),
(19842, 'Thursday',  6, 7, '24BCY-3',      'D3', 503, '24CSP-370', 'FS-1', 'B'),
(19842, 'Friday',    1, 2, '24BCY-3',      'D3', 507, '24CSP-370', 'FS-1', 'B'),
(19842, 'Friday',    7, 8, '24AIT_NTPP-1', 'D3', 205, '24CSP-370', 'FS-1', 'A');

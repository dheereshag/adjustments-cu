-- Insert Akshat into faculties
INSERT INTO faculties (id, name) VALUES (19851, 'Akshat');

-- Insert schedules for Akshat (faculty_id = 19851)
-- One row per slot (paired slots expanded into individual rows)
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday
(19851, 'Mon', 1, '23AML-5', 'D2', 317, '23CSH-382', 'FS-II', 'A'),
(19851, 'Mon', 2, '23AML-4', 'D4', 404, '23CSH-382', 'FS-II', 'A'),
(19851, 'Mon', 3, '23AML-4', 'D4', 404, '23CSH-382', 'FS-II', 'A'),
(19851, 'Mon', 5, '23AML-5', 'D2', 409, '23CSH-382', 'FS-II', 'A'),
(19851, 'Mon', 6, '23AML-5', 'D2', 409, '23CSH-382', 'FS-II', 'A'),
-- Tuesday
(19851, 'Tue', 1, '23AML-5', 'D2', 513, '23CSH-382', 'FS-II', 'B'),
(19851, 'Tue', 2, '23AML-5', 'D2', 513, '23CSH-382', 'FS-II', 'B'),
(19851, 'Tue', 3, '23AML-4', 'D2', 414, '23CSH-382', 'FS-II', 'B'),
(19851, 'Tue', 4, '23AML-4', 'D2', 414, '23CSH-382', 'FS-II', 'B'),
(19851, 'Tue', 5, '24AML-11', 'D2', 308, '24CSP-293', 'FS-I',  'A'),
(19851, 'Tue', 6, '24AML-11', 'D2', 308, '24CSP-293', 'FS-I',  'A'),
-- Wednesday
(19851, 'Wed', 1, '23AML-4',  'D4', 201, '23CSH-382', 'FS-II', 'A'),
(19851, 'Wed', 2, '23AML-4',  'D4', 201, '23CSH-382', 'FS-II', 'A'),
(19851, 'Wed', 5, '24AML-11', 'D2', 415, '24CSP-293', 'FS-I',  'A'),
(19851, 'Wed', 6, '24AML-11', 'D2', 415, '24CSP-293', 'FS-I',  'A'),
-- Thursday
(19851, 'Thu', 1, '23AML-4', 'D2', 510, '23CSH-382', 'FS-II', 'B'),
(19851, 'Thu', 3, '23AML-5', 'D2', 412, '23CSH-382', 'FS-II', 'B'),
(19851, 'Thu', 4, '23AML-5', 'D2', 412, '23CSH-382', 'FS-II', 'B'),
(19851, 'Thu', 6, '23AML-5', 'D2', 510, '23CSH-382', 'FS-II', 'A'),
(19851, 'Thu', 7, '23AML-5', 'D2', 510, '23CSH-382', 'FS-II', 'A'),
(19851, 'Thu', 8, '23AML-4', 'D2', 101, '23CSH-382', 'FS-II', 'A'),
-- Friday
(19851, 'Fri', 1, '23AML-4', 'D2', 414, '23CSH-382', 'FS-II', 'B'),
(19851, 'Fri', 2, '23AML-4', 'D2', 414, '23CSH-382', 'FS-II', 'B'),
(19851, 'Fri', 8, '23AML-5', 'D2', 409, '23CSH-382', 'FS-II', 'B');

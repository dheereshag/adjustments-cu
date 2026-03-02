-- Insert Vinay Kumar into faculties
INSERT INTO faculties (id, name) VALUES (19201, 'Vinay Kumar');

-- Insert schedules for Vinay Kumar (faculty_id = 19201)
-- One row per slot (paired slots expanded into individual rows)
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday: 1 & 2
(19201, 'Mon', 1, '23AML-6', 'D4', 305, '23CSP-378', 'CC-II', 'B'),
(19201, 'Mon', 2, '23AML-6', 'D4', 305, '23CSP-378', 'CC-II', 'B'),
-- Monday: 6 & 7
(19201, 'Mon', 6, '23AML-7', 'D2', 513, '23CSP-378', 'CC-II', 'A'),
(19201, 'Mon', 7, '23AML-7', 'D2', 513, '23CSP-378', 'CC-II', 'A'),
-- Tuesday: 1 & 2
(19201, 'Tue', 1, '23AML-6', 'D2', 510, '23CSP-378', 'CC-II', 'A'),
(19201, 'Tue', 2, '23AML-6', 'D2', 510, '23CSP-378', 'CC-II', 'A'),
-- Tuesday: 7 & 8
(19201, 'Tue', 7, '23AML-5', 'D2', 416, '23CSP-378', 'CC-II', 'B'),
(19201, 'Tue', 8, '23AML-5', 'D2', 416, '23CSP-378', 'CC-II', 'B'),
-- Wednesday: 1 & 2
(19201, 'Wed', 1, '23AML-6', 'D2', 306, '23CSP-378', 'CC-II', 'B'),
(19201, 'Wed', 2, '23AML-6', 'D2', 306, '23CSP-378', 'CC-II', 'B'),
-- Wednesday: 3 & 4
(19201, 'Wed', 3, '23AML-5', 'D2', 413, '23CSP-378', 'CC-II', 'A'),
(19201, 'Wed', 4, '23AML-5', 'D2', 413, '23CSP-378', 'CC-II', 'A'),
-- Wednesday: 6 & 7
(19201, 'Wed', 6, '23AML-6', 'D2', 410, '23CSP-378', 'CC-II', 'A'),
(19201, 'Wed', 7, '23AML-6', 'D2', 410, '23CSP-378', 'CC-II', 'A'),
-- Thursday: 3 & 4
(19201, 'Thu', 3, '23AML-7', 'D2', 306, '23CSP-378', 'CC-II', 'A'),
(19201, 'Thu', 4, '23AML-7', 'D2', 306, '23CSP-378', 'CC-II', 'A'),
-- Thursday: 6 & 7
(19201, 'Thu', 6, '23AML-5', 'D2', 411, '23CSP-378', 'CC-II', 'B'),
(19201, 'Thu', 7, '23AML-5', 'D2', 411, '23CSP-378', 'CC-II', 'B'),
-- Friday: 2 & 3
(19201, 'Fri', 2, '23AML-5', 'D2', 512, '23CSP-378', 'CC-II', 'A'),
(19201, 'Fri', 3, '23AML-5', 'D2', 512, '23CSP-378', 'CC-II', 'A');

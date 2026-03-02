-- Insert faculties
INSERT INTO faculties (id, name) VALUES
  (19162, 'Aman Kumar'),
  (19849, 'Amandeep Kaur Sekhon'),
  (19907, 'Tushar Singh Rajora'),
  (19816, 'Pritam Das');

-- ─── Aman Kumar (19162) ───────────────────────────────────────────────────────
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday: 1 & 2
(19162, 'Mon', 1, '24AML-9',  'D2', 406, '24CSP-283', 'CC-I', 'A'),
(19162, 'Mon', 2, '24AML-9',  'D2', 406, '24CSP-283', 'CC-I', 'A'),
-- Monday: 3 & 4
(19162, 'Mon', 3, '24AML-10', 'D2', 414, '24CSP-283', 'CC-I', 'A'),
(19162, 'Mon', 4, '24AML-10', 'D2', 414, '24CSP-283', 'CC-I', 'A'),
-- Tuesday: 1 & 2
(19162, 'Tue', 1, '24AML-10', 'D2', 512, '24CSP-283', 'CC-I', 'B'),
(19162, 'Tue', 2, '24AML-10', 'D2', 512, '24CSP-283', 'CC-I', 'B'),
-- Tuesday: 7 & 8
(19162, 'Tue', 7, '24AML-6',  'D2', 101, '24CSP-283', 'CC-I', 'B'),
(19162, 'Tue', 8, '24AML-6',  'D2', 101, '24CSP-283', 'CC-I', 'B'),
-- Wednesday: 1 & 2
(19162, 'Wed', 1, '24AML-8',  'D2', 510, '24CSP-283', 'CC-I', 'B'),
(19162, 'Wed', 2, '24AML-8',  'D2', 510, '24CSP-283', 'CC-I', 'B'),
-- Wednesday: 5 & 6
(19162, 'Wed', 5, '24AML-6',  'D2', 416, '24CSP-283', 'CC-I', 'A'),
(19162, 'Wed', 6, '24AML-6',  'D2', 416, '24CSP-283', 'CC-I', 'A'),
-- Wednesday: 7 & 8
(19162, 'Wed', 7, '24AML-5',  'D2', 306, '24CSP-283', 'CC-I', 'B'),
(19162, 'Wed', 8, '24AML-5',  'D2', 306, '24CSP-283', 'CC-I', 'B'),
-- Thursday: 1 & 2
(19162, 'Thu', 1, '24AML-7',  'D2', 512, '24CSP-283', 'CC-I', 'A'),
(19162, 'Thu', 2, '24AML-7',  'D2', 512, '24CSP-283', 'CC-I', 'A'),
-- Thursday: 5 & 6
(19162, 'Thu', 5, '24AML-8',  'D2', 318, '24CSP-283', 'CC-I', 'A'),
(19162, 'Thu', 6, '24AML-8',  'D2', 318, '24CSP-283', 'CC-I', 'A'),
-- Thursday: 7 & 8
(19162, 'Thu', 7, '24AML-7',  'D2', 508, '24CSP-283', 'CC-I', 'B'),
(19162, 'Thu', 8, '24AML-7',  'D2', 508, '24CSP-283', 'CC-I', 'B'),
-- Friday: 5 & 6
(19162, 'Fri', 5, '24AML-9',  'D2', 413, '24CSP-283', 'CC-I', 'B'),
(19162, 'Fri', 6, '24AML-9',  'D2', 413, '24CSP-283', 'CC-I', 'B'),
-- Friday: 7 & 8
(19162, 'Fri', 7, '24AML-5',  'D4', 107, '24CSP-283', 'CC-I', 'A'),
(19162, 'Fri', 8, '24AML-5',  'D4', 107, '24CSP-283', 'CC-I', 'A');

-- ─── Amandeep Kaur Sekhon (19849) ────────────────────────────────────────────
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday: 1 & 2
(19849, 'Mon', 1, '24AML-4', 'D2', 503, '24CSP-293', 'FS-I', 'B'),
(19849, 'Mon', 2, '24AML-4', 'D2', 503, '24CSP-293', 'FS-I', 'B'),
-- Monday: 5 & 6
(19849, 'Mon', 5, '24AML-2', 'D2', 512, '24CSP-293', 'FS-I', 'A'),
(19849, 'Mon', 6, '24AML-2', 'D2', 512, '24CSP-293', 'FS-I', 'A'),
-- Monday: 7 & 8
(19849, 'Mon', 7, '24AML-2', 'D2', 501, '24CSP-293', 'FS-I', 'B'),
(19849, 'Mon', 8, '24AML-2', 'D2', 501, '24CSP-293', 'FS-I', 'B'),
-- Tuesday: 2 & 3
(19849, 'Tue', 2, '24AML-4', 'D2', 413, '24CSP-293', 'FS-I', 'B'),
(19849, 'Tue', 3, '24AML-4', 'D2', 413, '24CSP-293', 'FS-I', 'B'),
-- Wednesday: 1 & 2
(19849, 'Wed', 1, '24AML-2', 'D2', 411, '24CSP-293', 'FS-I', 'A'),
(19849, 'Wed', 2, '24AML-2', 'D2', 411, '24CSP-293', 'FS-I', 'A'),
-- Wednesday: 3 & 4
(19849, 'Wed', 3, '24AML-4', 'D2', 408, '24CSP-293', 'FS-I', 'A'),
(19849, 'Wed', 4, '24AML-4', 'D2', 408, '24CSP-293', 'FS-I', 'A'),
-- Thursday: 1 & 2
(19849, 'Thu', 1, '24AML-4', 'D2', 307, '24CSP-293', 'FS-I', 'A'),
(19849, 'Thu', 2, '24AML-4', 'D2', 307, '24CSP-293', 'FS-I', 'A'),
-- Thursday: 5 & 6
(19849, 'Thu', 5, '24AML-3', 'D2', 410, '24CSP-293', 'FS-I', 'A'),
(19849, 'Thu', 6, '24AML-3', 'D2', 410, '24CSP-293', 'FS-I', 'A'),
-- Thursday: 7 & 8
(19849, 'Thu', 7, '24AML-3', 'D2', 317, '24CSP-293', 'FS-I', 'B'),
(19849, 'Thu', 8, '24AML-3', 'D2', 317, '24CSP-293', 'FS-I', 'B'),
-- Friday: 1 & 2
(19849, 'Fri', 1, '24AML-3', 'D2', 411, '24CSP-293', 'FS-I', 'A'),
(19849, 'Fri', 2, '24AML-3', 'D2', 411, '24CSP-293', 'FS-I', 'A'),
-- Friday: 5 & 6
(19849, 'Fri', 5, '24AML-3', 'D2', 510, '24CSP-293', 'FS-I', 'B'),
(19849, 'Fri', 6, '24AML-3', 'D2', 510, '24CSP-293', 'FS-I', 'B'),
-- Friday: 7 & 8
(19849, 'Fri', 7, '24AML-2', 'D2', 513, '24CSP-293', 'FS-I', 'B'),
(19849, 'Fri', 8, '24AML-2', 'D2', 513, '24CSP-293', 'FS-I', 'B');

-- ─── Tushar Singh Rajora (19907) ─────────────────────────────────────────────
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday: 1 & 2
(19907, 'Mon', 1, '24AML-8',  'D2', 413, '24CSP-293', 'FS-I', 'A'),
(19907, 'Mon', 2, '24AML-8',  'D2', 413, '24CSP-293', 'FS-I', 'A'),
-- Monday: 3 & 4
(19907, 'Mon', 3, '24AML-10', 'D2', 415, '24CSP-293', 'FS-I', 'B'),
(19907, 'Mon', 4, '24AML-10', 'D2', 415, '24CSP-293', 'FS-I', 'B'),
-- Monday: 7 & 8
(19907, 'Mon', 7, '24AML-9',  'D4', 404, '24CSP-293', 'FS-I', 'B'),
(19907, 'Mon', 8, '24AML-9',  'D4', 404, '24CSP-293', 'FS-I', 'B'),
-- Tuesday: 1 & 2
(19907, 'Tue', 1, '24AML-8',  'D2', 412, '24CSP-293', 'FS-I', 'A'),
(19907, 'Tue', 2, '24AML-8',  'D2', 412, '24CSP-293', 'FS-I', 'A'),
-- Tuesday: 5 & 6
(19907, 'Tue', 5, '24AML-8',  'D4', 404, '24CSP-293', 'FS-I', 'B'),
(19907, 'Tue', 6, '24AML-8',  'D4', 404, '24CSP-293', 'FS-I', 'B'),
-- Tuesday: 7 & 8
(19907, 'Tue', 7, '24AML-9',  'D2', 103, '24CSP-293', 'FS-I', 'A'),
(19907, 'Tue', 8, '24AML-9',  'D2', 103, '24CSP-293', 'FS-I', 'A'),
-- Wednesday: 1 & 2
(19907, 'Wed', 1, '24AML-10', 'D2', 318, '24CSP-293', 'FS-I', 'A'),
(19907, 'Wed', 2, '24AML-10', 'D2', 318, '24CSP-293', 'FS-I', 'A'),
-- Wednesday: 5 & 6
(19907, 'Wed', 5, '24AML-9',  'D2', 511, '24CSP-293', 'FS-I', 'B'),
(19907, 'Wed', 6, '24AML-9',  'D2', 511, '24CSP-293', 'FS-I', 'B'),
-- Wednesday: 7 & 8
(19907, 'Wed', 7, '24AML-10', 'D2', 507, '24CSP-293', 'FS-I', 'B'),
(19907, 'Wed', 8, '24AML-10', 'D2', 507, '24CSP-293', 'FS-I', 'B'),
-- Thursday: 5 & 6
(19907, 'Thu', 5, '24AML-8',  'D4', 503, '24CSP-293', 'FS-I', 'B'),
(19907, 'Thu', 6, '24AML-8',  'D4', 503, '24CSP-293', 'FS-I', 'B'),
-- Friday: 5 & 6
(19907, 'Fri', 5, '24AML-9',  'D4', 404, '24CSP-293', 'FS-I', 'A'),
(19907, 'Fri', 6, '24AML-9',  'D4', 404, '24CSP-293', 'FS-I', 'A'),
-- Friday: 7 & 8
(19907, 'Fri', 7, '24AML-10', 'D2', 103, '24CSP-293', 'FS-I', 'A'),
(19907, 'Fri', 8, '24AML-10', 'D2', 103, '24CSP-293', 'FS-I', 'A');

-- ─── Pritam Das (19816) ───────────────────────────────────────────────────────
INSERT INTO schedules (faculty_id, day, slot_id, class_name, block_name, room_number, course_code, course_name, "group") VALUES
-- Monday: 1 & 2
(19816, 'Mon', 1, '23AML-7',  'D2', 513, '23CSH-382', 'FS-II', 'B'),
(19816, 'Mon', 2, '23AML-7',  'D2', 513, '23CSH-382', 'FS-II', 'B'),
-- Monday: 3 & 4
(19816, 'Mon', 3, '23AML-6',  'D2', 413, '23CSH-382', 'FS-II', 'B'),
(19816, 'Mon', 4, '23AML-6',  'D2', 413, '23CSH-382', 'FS-II', 'B'),
-- Monday: 6 & 7
(19816, 'Mon', 6, '23AML-6',  'D2', 413, '23CSH-382', 'FS-II', 'A'),
(19816, 'Mon', 7, '23AML-6',  'D2', 413, '23CSH-382', 'FS-II', 'A'),
-- Monday: 8 (single)
(19816, 'Mon', 8, '23AML-7',  'D2', 306, '23CSH-382', 'FS-II', 'B'),
-- Tuesday: 3 & 4
(19816, 'Tue', 3, '23AML-7',  'D2', 409, '23CSH-382', 'FS-II', 'A'),
(19816, 'Tue', 4, '23AML-7',  'D2', 409, '23CSH-382', 'FS-II', 'A'),
-- Tuesday: 6 & 7
(19816, 'Tue', 6, '23AML-7',  'D2', 411, '23CSH-382', 'FS-II', 'B'),
(19816, 'Tue', 7, '23AML-7',  'D2', 411, '23CSH-382', 'FS-II', 'B'),
-- Wednesday: 1 & 2
(19816, 'Wed', 1, '24AML-11', 'D4', 404, '24CSP-293', 'FS-I',  'B'),
(19816, 'Wed', 2, '24AML-11', 'D4', 404, '24CSP-293', 'FS-I',  'B'),
-- Wednesday: 3 & 4
(19816, 'Wed', 3, '23AML-6',  'D2', 410, '23CSH-382', 'FS-II', 'A'),
(19816, 'Wed', 4, '23AML-6',  'D2', 410, '23CSH-382', 'FS-II', 'A'),
-- Wednesday: 6 & 7
(19816, 'Wed', 6, '23AML-6',  'D2', 317, '23CSH-382', 'FS-II', 'B'),
(19816, 'Wed', 7, '23AML-6',  'D2', 317, '23CSH-382', 'FS-II', 'B'),
-- Thursday: 1 & 2
(19816, 'Thu', 1, '23AML-7',  'D4', 201, '23CSH-382', 'FS-II', 'A'),
(19816, 'Thu', 2, '23AML-7',  'D4', 201, '23CSH-382', 'FS-II', 'A'),
-- Thursday: 6 & 7
(19816, 'Thu', 6, '23AML-7',  'D2', 511, '23CSH-382', 'FS-II', 'A'),
(19816, 'Thu', 7, '23AML-7',  'D2', 511, '23CSH-382', 'FS-II', 'A'),
-- Thursday: 8 (single)
(19816, 'Thu', 8, '24AML-11', 'D2', 318, '24CSP-293', 'FS-I',  'B'),
-- Friday: 3 & 4
(19816, 'Fri', 3, '23AML-6',  'D2', 411, '23CSH-382', 'FS-II', 'B'),
(19816, 'Fri', 4, '23AML-6',  'D2', 411, '23CSH-382', 'FS-II', 'B'),
-- Friday: 7 & 8
(19816, 'Fri', 7, '23AML-6',  'D2', 412, '23CSH-382', 'FS-II', 'A'),
(19816, 'Fri', 8, '23AML-6',  'D2', 412, '23CSH-382', 'FS-II', 'A');

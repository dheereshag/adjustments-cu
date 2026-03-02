-- Create courses table
CREATE TABLE courses (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Seed from existing distinct (course_code, course_name) pairs in schedules
INSERT INTO courses (code, name)
SELECT DISTINCT course_code, course_name
FROM schedules
WHERE course_code IS NOT NULL;

-- Add FK constraint: schedules.course_code → courses.code
ALTER TABLE schedules
  ADD CONSTRAINT schedules_course_code_fkey
  FOREIGN KEY (course_code) REFERENCES courses(code);

-- Drop the now-redundant course_name column from schedules
ALTER TABLE schedules DROP COLUMN course_name;

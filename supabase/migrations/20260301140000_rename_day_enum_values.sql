-- Rename day_enum values from full names to 3-letter abbreviations
ALTER TYPE day_enum RENAME VALUE 'Monday'    TO 'Mon';
ALTER TYPE day_enum RENAME VALUE 'Tuesday'   TO 'Tue';
ALTER TYPE day_enum RENAME VALUE 'Wednesday' TO 'Wed';
ALTER TYPE day_enum RENAME VALUE 'Thursday'  TO 'Thu';
ALTER TYPE day_enum RENAME VALUE 'Friday'    TO 'Fri';

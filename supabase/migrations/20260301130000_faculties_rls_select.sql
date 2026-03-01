-- Allow anyone to read the faculties table (names are not sensitive)
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on faculties"
  ON faculties
  FOR SELECT
  USING (true);

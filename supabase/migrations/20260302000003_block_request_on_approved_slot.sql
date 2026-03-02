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

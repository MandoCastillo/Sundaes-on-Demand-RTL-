import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SummaryForm = () => {
  const [isTCChecked, setIsTCChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}> Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isTCChecked}
          onChange={(e) => setIsTCChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isTCChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

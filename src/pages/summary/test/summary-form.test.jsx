import { render, screen } from "@testing-library/react";
import { SummaryForm } from "../summary-form";
import userEvent from "@testing-library/user-event";

describe("Term and conditions", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test("Checking enables button on first click and disables on second click", async () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    await userEvent.click(checkbox);
    expect(button).toBeEnabled();

    await userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test('Popover responds to hover',()=>{

  })
});

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { SummaryForm } from '../summary-form';
import userEvent from '@testing-library/user-event';

describe('Term and conditions', () => {
  test('Initial conditions', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test('Checking enables button on first click and disables on second click', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: 'Confirm order' });

    await userEvent.click(checkbox);
    expect(button).toBeEnabled();

    await userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test('Popover responds to hover', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    const overlay = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(overlay).not.toBeInTheDocument();
  });
});

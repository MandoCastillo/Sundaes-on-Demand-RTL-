import { render, screen } from '../../../test-utils/testing-library.utils';

import userEvent from '@testing-library/user-event';
import Options from '../options';
import { OrderDetailsProvider } from '../../../contexts/order-details';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
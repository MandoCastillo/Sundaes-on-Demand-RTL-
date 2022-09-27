import { render, screen } from '../../../test-utils/testing-library.utils';

import userEvent from '@testing-library/user-event';
import Options from '../options';
import OrderEntry from '../../entry/order-entry';

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

test('update toppings subtotal when topping change', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const hotFudgeCheckbox = screen.getByRole('checkbox', {
    name: 'Hot fudge',
  });
  await userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  await userEvent.click(cherriesCheckbox);
  await userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('0.00');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '3');
    expect(grandTotal).toHaveTextContent('7.50');

    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('6.00');

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
  });
});

// import { render, screen } from '@testing-library/react';
import Options from '../options';
import { render, screen } from '../../../test-utils/testing-library.utils';

test('Display image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map(element => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});

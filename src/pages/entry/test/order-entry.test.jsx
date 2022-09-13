import { render, screen } from '../../../test-utils/testing-library.utils';
import OrderEntry from '../order-entry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<OrderEntry />);
  const alerts = await screen.findAllByText(
    /An unexpected error occurred. Please try again later./,
  );
  expect(alerts).toHaveLength(2);
});

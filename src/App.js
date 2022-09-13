import './App.css';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/order-details';
import OrderEntry from './pages/entry/order-entry';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;

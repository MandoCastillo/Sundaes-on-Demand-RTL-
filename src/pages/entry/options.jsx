import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './scoop-option';
import { Row } from 'react-bootstrap';
import ToppingOption from './topping-option';
import AlertBanner from '../common/alert-banner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/order-details';
import { formatCurrency } from '../../utilities';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner message="An unexpected error occurred. Please try again later." />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

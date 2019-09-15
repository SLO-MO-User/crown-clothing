import { connect } from 'react-redux';
import { compose } from 'redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';
import CheckoutItem from './checkout-item.component';

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
});

const CheckoutItemContainer = compose(
  connect(
    null,
    mapDispatchToProps
  )
)(CheckoutItem);

export default CheckoutItemContainer;

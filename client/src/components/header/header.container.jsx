import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { signOutStart } from '../../redux/user/user.actions';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import Header from './header.component';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
});

const HeaderContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);

export default HeaderContainer;

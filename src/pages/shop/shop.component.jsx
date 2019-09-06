import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshowToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    isLoading: true,
  };

  unsubscribeFromSnaphot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // using promise version of firebase libs get method
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshowToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({
        isLoading: false,
      });
    });

    /* 
    // using native fetch method and using firebase as api
    fetch(
      'https://firestore.googleapis.com/v1/projects/crwn-db-5c688/databases/(default)/documents/collections'
    )
      .then(response => response.json())
      .then(collections => console.log(collections))
      .catch(error => console.error(error));
    */

    /*
      // onSnapshot uses firebase library and its using observable-subscribe pattern 
      this.unsubscribeFromSnaphot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshowToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({
        isLoading: false,
      });
    });
    */
  }

  /*   componentWillUnmount() {
    this.unsubscribeFromSnaphot();
  } */

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);

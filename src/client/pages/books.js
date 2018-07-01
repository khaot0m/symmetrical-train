import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';


import Subscriptions from '../graphql/subscriptions';
import Queries from '../graphql/queries';

import Book from '../components/book';
import Loading from '../components/linear-progress';


class BooksPage extends Component {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }
  _getBooks() {
    return this.props.data.books ?
      this.props.data.books.map(book => (
        <Grid item xs={12} sm={12} md={6} lg={3} xl={4}>
          <Book {...book} />
        </Grid>
      ))
      : <Loading />;
  }
  render() {
    return (
      <Grid container spacing={24}>
        {this._getBooks()}
      </Grid>);
  }
}

BooksPage.propTypes = {
  data: PropTypes.object.isRequired,
  subscribeToNewComments: PropTypes.func.isRequired
};

const Books = () =>
  (<Query
    query={Queries.bookQuery}
  >{({ subscribeToMore, ...result }) => (
    <BooksPage
      {...result}
      subscribeToNewComments={() =>
        subscribeToMore({
          document: Subscriptions.bookSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return Object.assign({}, {
              books: prev.books.concat(subscriptionData.data.bookCreated)
            });
          }
        })
      }
    />
  )}
  </Query>);

export default Books;

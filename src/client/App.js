import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';


import client from './graphql-client';
import './app.css';

const BOOK_QUERY = gql`
  {
    books{
      title
      author
    }
  }
`;

const BOOK_SUBSCRIPTION = gql`
  subscription bookCreated{
    bookCreated{
      title
      author
    }
  }
`;
class BooksPage extends Component {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }
  render() {
    console.log(this.props, 'PROPS');
    return (
      this.props.data.books ? this.props.data.books.map(({ author, title }) => <div>{author}:{title} </div>) : <h4>No Books</h4>
    );
  }
}
const Books = () =>
  (<Query
    query={BOOK_QUERY}
  >{({ subscribeToMore, ...result }) => (
    <BooksPage
      {...result}
      subscribeToNewComments={() =>
        subscribeToMore({
          document: BOOK_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            console.log(prev, subscriptionData, 'SAS');
            if (!subscriptionData.data) return prev;
            const newBook = subscriptionData.data.bookCreated;
            console.log(prev, subscriptionData, 'SAS');
            return Object.assign({},{
              books: prev.books.concat(subscriptionData.data.bookCreated)
            })
        }
        })
      }
    />
  )}
   </Query>);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Books />
    </div>
  </ApolloProvider>
);
export default App;

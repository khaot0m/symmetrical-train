import React from 'react';
import { ApolloProvider} from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import client from './graphql/graphql-client';
import Navigation from './components/navigation';
import Books from './pages/books';

import './app.css';


const App = () => (
  <ApolloProvider client={client}>
    <Navigation />
    <Router>
    <div>
      <h2>PageHeader 🚀</h2>
      <Link to="/books"> Books</Link>
      <Route exact path="/books" component={Books} />

    </div>
    </Router>
  </ApolloProvider>
);
export default App;

import React from 'react';
import { ApolloProvider} from 'react-apollo';
import client from './graphql/graphql-client';
import Navigation from './components/navigation';
import Books from './pages/books';

import './app.css';


const App = () => (
  <ApolloProvider client={client}>
    <Navigation />

    <div>
      <h2>PageHeader 🚀</h2>
      <Books />
    </div>
  </ApolloProvider>
);
export default App;

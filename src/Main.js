import React, {useEffect} from 'react';
import Screens from './screens';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import getEnvVars from '../config';
// import { DB_PREPARE } from './query';

const { API_URI } = getEnvVars();
const uri = API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache
});

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <Screens />
    </ApolloProvider>
  );
};


export default Main;
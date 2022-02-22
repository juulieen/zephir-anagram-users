import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import * as ws from 'ws';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_HTTP_URI as string
});

const wsLink = new WebSocketLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_WS_URI as string,
  options: {
    reconnect: true
  },
  webSocketImpl: (typeof window === "undefined") ? ws : undefined 
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

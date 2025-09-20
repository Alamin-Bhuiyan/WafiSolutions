import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation: any, variables: any) {
  return fetch('https://localhost:7114/graphql/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => res.json());
}

export const relayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

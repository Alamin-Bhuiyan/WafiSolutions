import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Prefer a runtime-relative path so the browser calls the same origin and nginx can proxy.
// Allow an optional runtime override (injected by the server) via window.__API_URL__
const DEFAULT_GRAPHQL_PATH = '/graphql';

function getGraphqlUrl(): string {
  // Runtime override (example: nginx can serve a small /config.js that sets window.__API_URL__)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const runtime = win.__API_URL__;
    if (runtime && typeof runtime === 'string' && runtime.length > 0) {
      return runtime.replace(/\/$/, '') + '/graphql';
    }
  } catch (e) {
    // window may be undefined in some server-side contexts; ignore
  }

  // Build-time environment variable (when provided during image build)
  const base = process.env.REACT_APP_API_URL;
  if (base && base.length > 0) {
    return base.replace(/\/$/, '') + '/graphql';
  }

  return DEFAULT_GRAPHQL_PATH;
}

function fetchQuery(operation: { text?: string }, variables: Record<string, unknown> | null) {
  const url = getGraphqlUrl();
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => {
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  });
}

export const relayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

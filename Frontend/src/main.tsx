import { RelayEnvironmentProvider } from 'react-relay';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { relayEnvironment } from "./relay/environment.ts";

createRoot(document.getElementById("root")!).render(

<RelayEnvironmentProvider environment={relayEnvironment}>
  <App />
</RelayEnvironmentProvider>

);

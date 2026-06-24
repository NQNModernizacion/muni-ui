

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/index.css";
import "../tokens/tokens.css";
import "../styles/styles.css";


import App from '../playground/App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="mx-ui mx-ui--full">
      <App />
    </div>
  </StrictMode>
);

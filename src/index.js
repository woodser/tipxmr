import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";

import { StreamerProvider } from "./context/streamer";
import { WalletProvider } from "./context/wallet";
import { SyncProvider } from "./context/sync";

const root = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <WalletProvider>
      <StreamerProvider>
        <SyncProvider>
          <App />
        </SyncProvider>
      </StreamerProvider>
    </WalletProvider>
  </StrictMode>,
  root
);

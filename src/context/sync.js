import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SyncStateContext = createContext();
const SyncUpdateContext = createContext();

function SyncProvider({ children }) {
  const [state, setState] = useState({});

  return (
    <SyncStateContext.Provider value={state}>
      <SyncUpdateContext.Provider value={setState}>
        {children}
      </SyncUpdateContext.Provider>
    </SyncStateContext.Provider>
  );
}
SyncProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useSyncState() {
  const context = useContext(SyncStateContext);

  if (context === undefined) {
    throw new Error("useSyncState must be used within a SyncProvider");
  }

  return context;
}

function useSyncUpdate() {
  const context = useContext(SyncUpdateContext);

  if (context === undefined) {
    throw new Error("useSyncUpdate must be used within a SyncProvider");
  }

  return context;
}

function useSync() {
  return [useSyncState(), useSyncUpdate()];
}

export { SyncProvider, useSyncState, useSyncUpdate, useSync };

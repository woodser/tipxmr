import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { MoneroWalletListener } from "monero-javascript";

class SynchronisationListener extends MoneroWalletListener {
  constructor(onProgress, onBalancesChanged) {
    super();
    this.onProgress = onProgress;
    this.onBalances = onBalancesChanged;
  }

  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    this.onProgress(height, startHeight, endHeight, percentDone, message);
  }

  onBalancesChanged(newBalance, newUnlockedBalance) {
    const balance = parseFloat(newBalance) / Math.pow(10, 12);
    const unlockedBalance = parseFloat(newUnlockedBalance) / Math.pow(10, 12);
    this.onBalances(balance, unlockedBalance);
  }
}

const SyncStateContext = createContext();
const SyncDispatchContext = createContext();

function synchronisationReducer(state, action) {
  switch (action.type) {
    case "SET_IS_ACTIVE":
      return { ...state, isActive: action.isActive };
    case "SET_IS_DONE":
      return { ...state, isDone: action.isDone };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "SET_BALANCE":
      return { ...state, balance: action.balance };
    case "SET_UNLOCKEDBALANCE":
      return { ...state, unlockedBalance: action.unlockedBalance };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function SyncProvider({ children }) {
  const initialState = {
    isActive: false,
    isDone: false,
    progress: 0,
    balance: 0,
    unlockedBalance: 0,
  };
  const [state, dispatch] = useThunkReducer(
    withLogger(synchronisationReducer),
    initialState
  );

  return (
    <SyncStateContext.Provider value={state}>
      <SyncDispatchContext.Provider value={dispatch}>
        {children}
      </SyncDispatchContext.Provider>
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
  const context = useContext(SyncDispatchContext);

  if (context === undefined) {
    throw new Error("useSyncUpdate must be used within a SyncProvider");
  }

  return context;
}

function useSync() {
  return [useSyncState(), useSyncUpdate()];
}

export { SyncProvider, useSyncState, useSyncUpdate, useSync };

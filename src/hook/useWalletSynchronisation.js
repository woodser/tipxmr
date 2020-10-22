import { useCallback, useEffect, useReducer, useRef } from "react";
import { useWalletState } from "../context/wallet";
import { useSync, startSync, stopSync } from "../context/sync";

export function useWalletSynchronisation() {
  const wallet = useWalletState();
  const [state, dispatch] = useSync();

  function start() {
    dispatch(startSync(wallet.wallet, wallet.restoreHeight));
  }
  function stop() {
    dispatch(stopSync(wallet.wallet));
  }

  return { ...state, start, stop };
}

export default useWalletSynchronisation;

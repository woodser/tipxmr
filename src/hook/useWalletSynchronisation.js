import { useCallback, useEffect, useReducer, useRef } from "react";
import { useWalletState } from "../context/wallet";

export function useWalletSynchronisation() {
  const listenerRef = useRef();
  const progressRef = useRef();
  const balanceRef = useRef();
  const unlockedBalanceRef = useRef();
  const wallet = useWalletState();
  const [state, dispatch] = useReducer(reducer, {
    isActive: false,
    isDone: false,
    progress: 0,
    balance: 0,
    unlockedBalance: 0,
  });

  progressRef.current = state.progress;

  function onProgress(height, startHeight, endHeight, percentDone, message) {
    const percentage = Math.floor(percentDone * 100);

    if (progressRef.current !== percentage) {
      dispatch({ type: "SET_PROGRESS", progress: percentage });
    }

    if (percentDone === 1) {
      dispatch({ type: "SET_IS_DONE", isDone: true });
    }
  }

  function onBalancesChanged(newBalance, newUnlockedBalance) {
    if (balanceRef.current !== newBalance) {
      dispatch({ type: "SET_BALANCE", balance: newBalance });
    }

    if (unlockedBalanceRef.current !== newUnlockedBalance) {
      dispatch({
        type: "SET_UNLOCKEDBALANCE",
        unlockedBalance: newUnlockedBalance,
      });
    }
  }

  async function start() {
    dispatch({ type: "SET_IS_DONE", isDone: false });
    dispatch({ type: "SET_IS_ACTIVE", isActive: true });
    await wallet.wallet.setSyncHeight(wallet.restoreHeight);
    await wallet.wallet.startSyncing();
  }

  async function stop() {
    await wallet.wallet.stopSyncing();
    dispatch({ type: "SET_IS_ACTIVE", isActive: false });
  }

  useEffect(() => {
    listenerRef.current = new SynchronisationListener(
      onProgress,
      onBalancesChanged
    );

    return () => {
      listenerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (wallet.wallet) {
      wallet.wallet.addListener(listenerRef.current);
    }

    return () => {
      if (wallet.wallet) {
        wallet.wallet.removeListener(listenerRef.current);
      }
    };
  }, [wallet.wallet]);

  return { ...state, start, stop };
}

export default useWalletSynchronisation;

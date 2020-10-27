import { useState, useReducer, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { create, openFromSeed, useWalletDispatch } from "../context/wallet";
import { daemonConfigurationState } from "../store/atom";

function useOpenWallet(params) {}

function useCreate(params) {}

function useWalletContext() {
  const dispatch = useWalletDispatch();
  const daemonConfiguration = useRecoilValue(daemonConfigurationState);
}

export default useWalletContext;

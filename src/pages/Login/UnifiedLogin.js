import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useWallet, openFromSeed } from "~/context/wallet";
import monerojs from "~/libs/monero";
import { useRecoilValue } from "recoil";
import { streamerState, dispatcherState } from "../../store/atom";
import socket_streamer from "~/libs/socket_streamer";
import Loading from "~/components/Loading";
import { Button, Toggle } from "~/components";

import Info from "./Info";
import LanguagePicker from "./LanguagePicker";

function PickUserName({ onChange, isLoading, userNameError }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Pick your username</h2>
      <input
        className="text-xmrgray-darker p-2 rounded focus:border-none"
        onChange={onChange}
        disabled={isLoading}
      ></input>
      <p className="text-xmrorange mt-2">{userNameError}</p>
      <p className="tracking-tight text-xs text-xmrgray-light mt-2">
        This name cannot be changed once chosen
      </p>
    </div>
  );
}

function Login({ seed, setSeed }) {
  function handleSeedChanged(event) {
    setSeed(event.target.value);
  }

  return (
    <div className="flex-1 mt-16 mx-auto">
      <h2 className="flex-1 my-8 text-center text-2xl">
        Login by pasting your seed{" "}
        <span role="img" aria-label="wallet">
          👛
        </span>
      </h2>
      <div className="flex flex-col justify-center mt-3 space-x-4">
        <textarea
          className="select-all outline-none text-gray-200 text-justify border-4 border-dashed border-xmrorange-lighter p-5 bg-xmrgray-darker rounded"
          id="seed"
          name="seed"
          rows="5"
          cols="50"
          placeholder="Open your wallet by entering your 25 seed words..."
          value={seed}
          style={{ resize: "none" }}
          onChange={handleSeedChanged}
        />
      </div>
    </div>
  );
}

function CreateAccount({ seed, handleSeedChanged }) {
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);

  function createWallet(lang) {
    setIsLoading(true);
    monerojs
      .createWallet(lang)
      .then(monerojs.getMnemonic)
      .then(setSeed)
      .then(() => setIsLoading(false));
  }

  function handleCreateWallet() {
    createWallet(language);
  }

  return (
    <div className="flex flex-col mt-16 ">
      <div className="flex flex-1 justify-center">
        <LanguagePicker language={language} setLanguage={setLanguage} />
      </div>
      <div className="flex flex-1 justify-center mt-3 space-x-4">
        <textarea
          className="select-all outline-none text-gray-200 text-justify border-4 border-dashed border-xmrorange-lighter p-5 bg-xmrgray-darker rounded"
          id="seed"
          name="seed"
          rows="5"
          cols="50"
          placeholder="Open your wallet by entering your 25 seed words..."
          value={seed}
          style={{ resize: "none" }}
          onChange={handleSeedChanged}
        />
      </div>
      <div className="flex flex-1 justify-center mt-3">
        <Button
          buttonWidth="w-auto"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleCreateWallet}
        >
          Create New Wallet
        </Button>
      </div>
    </div>
  );
}

function UnifiedLogin() {
  const [seed, setSeed] = useState("");
  const [userName, setUserName] = useState(null);

  const dispatcher = useRecoilValue(dispatcherState);
  const streamer = useRecoilValue(streamerState);
  const [wallet, dispatch] = useWallet();

  const { isPending, isResolved } = wallet.status;
  const [creationMode, setCreationMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Das streamer.restoreHeight, weil er erst weiterleiten soll,
  // wenn die Streamer Config vom Backend gesendet wurde
  if (isResolved && isLoggedIn && !wallet.error) {
    console.log("Redirected to dashboard");
    return <Redirect to="/dashboard" />;
  }

  function handleToggleChanged() {
    setCreationMode(!creationMode);
  }

  function handleSeedChanged(event) {
    setSeed(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <Toggle
        isChecked={creationMode}
        textLeft="Login"
        textRight="Create Account"
        onClick={handleToggleChanged}
        className="my-8"
      ></Toggle>
      {creationMode ? (
        <CreateAccount seed={seed} handleSeedChanged={handleSeedChanged} />
      ) : (
        <Login seed={seed} setSeed={setSeed} />
      )}
    </div>
  );
}

export default UnifiedLogin;

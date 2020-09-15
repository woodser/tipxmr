import React, { useState } from "react";
import PropTypes from "prop-types";
import Animation from "../Animation";
import Savebutton from "../dump_components/Savebutton";
import InputField from "../dump_components/InputField";
import CheckboxField from "../dump_components/CheckboxField";
import Button from "../dump_components/Button";

function AnimationSettings({ streamerConfig, setStreamerConfig }) {
  const [proxyState, setProxyState] = useState({ ...streamerConfig });
  function setAnimationSettings(key, value) {
    // always previous state
    setProxyState((prevState) => ({
      ...prevState,
      animationSettings: { ...prevState.animationSettings, [key]: value },
    }));
  }
  // fontSize (Dropdown)
  // gifsMinAmount
  // charLimit
  return (
    <div className="h-full text-xmrgray-darker">
      <div className="mx-auto">
        <div className="text-center text-xl underline mb-4">
          Change your Animation:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputField
            name="secondPrice"
            labelName="The price of 1 second (in XMR)"
            placeholderName={proxyState.animationSettings.secondPrice}
            fieldType="text"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
            className="col-span-1"
          />
          <InputField
            name="fontColor"
            labelName="Hexcode for font color"
            placeholderName={proxyState.animationSettings.fontColor}
            fieldType="color"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <InputField
            name="minAmount"
            labelName="Minimum amount of a donation (in XMR)"
            placeholderName={proxyState.animationSettings.minAmount}
            fieldType="text"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <InputField
            name="goal"
            labelName="Set a donation goal for your stream (in XMR)"
            placeholderName={proxyState.animationSettings.goal}
            fieldType="text"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <CheckboxField
            name="showGoal"
            labelName="Show your goal in Animation?"
            defaultChecked={proxyState.animationSettings.showGoal}
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <CheckboxField
            name="gifs"
            labelName="Allow users to send gifs"
            defaultChecked={proxyState.animationSettings.gifs}
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <CheckboxField
            name="fontShadow"
            labelName="Turn on text shadow"
            defaultChecked={proxyState.animationSettings.fontShadow}
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <InputField
            name="sound"
            labelName="Upload a custom MP3 for donations"
            placeholderName={proxyState.animationSettings.sound}
            fieldType="file"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
          <InputField
            name="bgImg"
            labelName="Upload custom background image for donations"
            placeholderName={proxyState.animationSettings.bgImg}
            fieldType="file"
            stateSetter={setAnimationSettings}
            baseState={proxyState}
          />
        </div>

        {/* <Savebutton /> */}
        <Button buttonText="Save" color="bg-xmrorange" />
      </div>
    </div>
  );
}
AnimationSettings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default AnimationSettings;

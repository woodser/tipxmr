import React, { useState } from "react";
import Login from "./Login";
import UnifiedLogin from "./UnifiedLogin";
import Info from "./Info";

function Signup() {
  const [showInfo, setShowInfo] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="w-full container m-auto">
      {showInfo ? (
        <Info stateSetterInfo={setShowInfo} stateSetterCreate={setShowLogin} />
      ) : null}
      {showLogin ? <UnifiedLogin /> : null}
    </div>
  );
}

export default Signup;

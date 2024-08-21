import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import LogOut from "./logout"

function App() {

  return (
    <div id="screen">
      <Header />
      <Faucet />
      <Balance />
      <Transfer />
      <LogOut />
    </div>
  );
}

export default App;

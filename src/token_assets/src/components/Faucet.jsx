import React, { useState,useContext,useEffect } from "react";
import { token ,createActor,canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";
import { PrincipalIdFromMain } from "../index";


function Faucet() {
  const [loading,setLoding] = useState(false)
  const [disable,setDisabled] = useState(false)
  const [resultt,setResult ] = useState("Claim")
  const [account,setAccount] = useState("")
  const PrinciplId = useContext(PrincipalIdFromMain)

  useEffect(()=>{
    setAccount(PrinciplId._principal.toLocaleString()
)
  },[])

  async function handleClick(event) {
    event.preventDefault();
    ;
    
    try {

    const autClient = await AuthClient.create();
    const identity = await autClient.getIdentity();
    const AuthenticatedCanister = createActor(canisterId,{
      agentOptions :{
        identity,
      }
    })


      setDisabled(true)
      setLoding(true)
      const result = await token.faucet()
      setResult(result)
      setLoding(false)
      setDisabled(false)

    } catch (error) {
      
    }
    
  }

  return (
    <div className="blue window">
    <div className="relative">
      
    </div>
      <h2>
        <span role="img" aria-label="tap emoji">
          🎉
        </span>
        Claim Your Free token
      </h2>
      <label>Get your free Molalign tokens here! Claim 10,000 MOLT coins to <br /><div style={{color:"black" , backgroundImage : "linear-gradient(to right, #FFB6C1, #FA7F8F, #F5425E, #F0002A)" , padding : "5px" ,marginTop:"5px"}}>{account}</div> </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={disable}>
          {loading ? "Wait" : resultt}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

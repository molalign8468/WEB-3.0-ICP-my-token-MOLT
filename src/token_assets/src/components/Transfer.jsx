import React, { useState } from "react";
import { token ,canisterId,createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";
import {Principal} from "@dfinity/principal"


function Transfer() {
  const [amount,setAmount] = useState();
  const [toAccount, setAccount] = useState();
   const [isLoading,setIsLoading] = useState(false)
  const [isDisabled,setDisabled] = useState(false)
  const [result,setResult] = useState("Transfer")


  
  async function handleClick() {
    try {

      const authClient = await AuthClient.create();
      const identity = await authClient.getIdentity()
      const AuthenticatedCanister = createActor(canisterId,{
      agentOptions :{
        identity,
      }
      })
      
      setDisabled(true)
      setIsLoading(true)
      const PrincipalId = Principal.fromText(toAccount);
      const resultt = await token.transfer(PrincipalId,parseInt(amount));
      setResult(resultt)
      setDisabled(false)
      setIsLoading(false)

    } catch (error) {
      setDisabled(false)
      setIsLoading(false) 
      alert("Error in transfer either invalid account id or empty input ")    
    }
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e)=>{
                  setAccount(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e)=>{
                  setAmount(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            
            {isLoading ? "Waite": result}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;

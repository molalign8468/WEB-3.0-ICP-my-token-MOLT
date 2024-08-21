import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import { token ,createActor,canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";
function Balance() {
  const [PreId,setPreId] = useState("")
  const [Balance,SetBalance] = useState("");
  const [isHidden ,setHidden] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isDisabled,setDisabled] = useState(false)
  const [error,setError] = useState(false)
  
  
  
  async function handleClick(e) {
        try {    

          const authClienet = await AuthClient.create();
          const identity = await authClienet.getIdentity();
          const AuthenticatedCanister = createActor(canisterId,{
            agentOptions :{
              identity
            }
          })

              setDisabled(true)
              setIsLoading(true)
               const PrincipalId = Principal.fromText(PreId) ;
               const balance =  await token.checkBalnce(PrincipalId);
               SetBalance(balance.toLocaleString())   
               setHidden(true)
               setDisabled(false)
               setIsLoading(false)
               setError(false)
        } catch (error) {
               setError(true)
              setDisabled(false)
               setIsLoading(false)
               setHidden(false)
        }    
   }

   function handelChange(event){
    setPreId(event.target.value);
   }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={handelChange}
          value={PreId}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
          disabled={isDisabled}
        >
           {isLoading ? "waite" : "Check Balance"}
        </button>
      </p>

      {isHidden && <p>This account has a balance of {Balance} MOLT</p>}
      {error && <p style={{color : "red"}}>This account is not found</p>}
      
    </div>
  );
}

export default Balance;

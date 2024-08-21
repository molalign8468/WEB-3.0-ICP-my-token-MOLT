import React from "react";
import { AuthClient } from "@dfinity/auth-client";

function LogOut() {
    const handelLogout =async()=>{
       const authClient = await AuthClient.create()
       await authClient.logout()
    }
    

 
  return (
    <header>
      <div className="blue" id="" >
        <button onClick={handelLogout} id="btn-transfer" style={{width:"200px",margin:"10px"}}>
          <span role="img" aria-label="tap emoji" >
            💎
          </span>
          Log out 
          
        </button>
      </div>
    </header>
  );
}

export default LogOut;
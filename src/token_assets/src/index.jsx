import ReactDOM from 'react-dom'
import React,{createContext} from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';
export const PrincipalIdFromMain = createContext()


const init = async () => { 
  
  try {
        const authClient = await AuthClient.create();

        

        if (await authClient.isAuthenticated()) {
          authHandeler(authClient)
        } else {
          
          await authClient.login({
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: () => {
              authHandeler(authClient)
            },
            onFailure: (error) => {
              console.log(error);
              
            },
          });
        }
      } catch (error) {

      }
  


}

async function authHandeler(authClienet){
  const identity = authClienet.getIdentity()
    ReactDOM.render(<PrincipalIdFromMain.Provider value={identity}><App /></PrincipalIdFromMain.Provider>, document.getElementById("root"));
}

init();



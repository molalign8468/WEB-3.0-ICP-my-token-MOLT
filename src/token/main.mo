import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
actor token {
  
var principalId = "b2ho5-3qdub-ubx4a-5bs54-zruxq-fs37t-calfj-bpbgh-65l26-klliv-lae";
var owener : Principal = Principal.fromText(principalId);
var totalSupply : Nat = 1000000000;
var symbolForMyToken : Text = "CHUT";
Debug.print("Hello");

//ledure

// For making stable hashe map
stable var hashMapEneteries  : [(Principal,Nat)] = [];

var balnce = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
 if(balnce.size() < 1){
  balnce.put(owener,totalSupply);
 };

//   to cheke the balnce 

public query func checkBalnce(who : Principal) : async Nat{

    let result : Nat = switch(balnce.get(who)) {
        case(null) { return 0  };
        case(?result) { return result };
    };
    return result;

};

public shared(msg) func faucet() : async Text{
    Debug.print(debug_show(msg.caller));
     if(balnce.get(msg.caller) == null){
        balnce.put(msg.caller,10000);
        return "Sucess";
     }else{
        return "Allrady claaimed";
     };
};

public shared(msg) func transfer(to : Principal , ammount : Nat) : async Text{

    let senderBalnce : Nat = await  checkBalnce(msg.caller);
    if(senderBalnce > ammount){
        let toBalnce : Nat = await checkBalnce(to);
        let newToBalnce : Nat = toBalnce + ammount;
        balnce.put(to,newToBalnce);

        let newSenderBalnce : Nat = senderBalnce - ammount;
        balnce.put(msg.caller,newSenderBalnce);
        return "Success";
    }else{
        return "Insefecient Fund";
    };

};



// for holding on the pre Upgarde

system func preupgrade(){
  hashMapEneteries := Iter.toArray(balnce.entries());
};

system func postupgrade(){
 balnce := HashMap.fromIter<Principal,Nat>(hashMapEneteries.vals(),1,Principal.equal,Principal.hash);
 if(balnce.size() < 1){
  balnce.put(owener,totalSupply);
 };
};



}
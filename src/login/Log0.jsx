import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { Username, UserUid } from "../database/funcs";
import { Redirect, useHistory } from "react-router";
import Loading from "../components/Loading";

export default function Log0(){
    const {currentUser} = useContext(AuthContext);
    const history = useHistory();
    if(currentUser){
        const name = Username();
        const uid=UserUid();
        if(name===null){
            return <Redirect to="/test" />;
        }else{
            localStorage.setItem("username", name);
            localStorage.setItem("uid", uid );
        }
        setTimeout(function(){history.push("/")}, 2000);
        return <div>
        
        <Loading message={"Logging you in..."}/>
        </div>
    }
    else{
        return <Redirect to="/login" />;
    }
}
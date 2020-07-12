import React from "react";
import Header from "../components/NavHeader";
import { Redirect, useHistory } from "react-router";
export default function Discover() {

    const history = useHistory() ; 
    return <div>
        <Header title="Discover" />
        <div className="container">
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            state:{id: 'karthik.pasupulatei'}, 
                        })
            }}>karthik Pasupulatei</a></h3>
            
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            state:{id: 'taranggarlapally'}, 
                        })
            }}>taranggarlapally</a></h3>
            
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            state:{id: 'tarangyadav333'}, 
                        })
            }}>tarangyadav333</a></h3>

        </div>


    </div>
}
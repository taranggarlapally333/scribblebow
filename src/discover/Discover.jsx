import React, { useState } from "react";
import Header from "../components/NavHeader";
import { Redirect, useHistory } from "react-router";
import db from "../database/db";
export default function Discover() {

    const history = useHistory() ; 
    const [temp , setTemp] = useState(null) ;
    return <div>
        <Header title="Discover" />
        <div className="container">
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            search:'?UserId=karthik.pasupulatei',
                            state:{id: 'karthik.pasupulatei' , key:'karthik.pasupulatei'}, 
                             
                        })
            }}>karthik Pasupulatei</a></h3>
            
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            search:'?UserId=taranggarlapally',
                            state:{id: 'taranggarlapally'}, 
                        })
            }}>taranggarlapally</a></h3>
            
            <h3><a href ="" onClick={()=>{
               history.push({
                            pathname:'/Profile' , 
                            search:'?UserId=tarangyadav333',
                            state:{id: 'tarangyadav333'}, 
                        })
            }}>tarangyadav333</a></h3>
        </div>


    </div>
}
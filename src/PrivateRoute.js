import React, { useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./Auth";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    
    return (
        <Route 
        {...rest}
        render = {routeProps =>
        localStorage.getItem("username") ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Redirect to={"/Log0"} />
        ) 
        }
        />
    );
}


export default PrivateRoute;
import React from "react";
import Header from "../components/NavHeader";

export default function Discover() {
    return <div>
        <Header title="Discover" />
        <div className='container-fluid'>
            <div className="search-bar">
                <i className="fa fa-search"></i>
                <input type="text" className="search-input" placeholder="Search" />
            </div>
        </div>
        <div className="container">
            <div className="col-md-8 discover-content">
                <h2 style={{ height: "700px" }}>fvc</h2>
            </div>
            <div className="col-md-4 trending-creators">

            </div>
        </div>


    </div>
}
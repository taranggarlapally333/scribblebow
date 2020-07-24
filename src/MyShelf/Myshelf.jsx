import React from "react";
import Header from "../components/NavHeader";
import { Button, Tab } from "react-bootstrap";
import { ButtonBase } from "@material-ui/core";
import {DiscoverTab} from "../discover/DiscoverComps";
import { useHistory } from "react-router";
import { ShelfResults } from "./MyshelfComps";







export default class Myshelf extends React.Component{

    constructor(props){
        super(props);
        this.state={category:"stories"}
    }
    // shouldComponentUpdate(NextProps,NextState){

    // }

    SelectButtons=()=>{
        return <div><a className="btn create-btn" style={{ backgroundColor: "#E61D42",width:"100%"}} onClick={() => { this.setState({category:"stories"}) }}>Stories</a>
        <a className="btn create-btn" style={{ backgroundColor: "#FF7F00",width:"100%"}} onClick={() => { this.setState({category:"poems"}) }}>Poems</a>
        <a className="btn create-btn" style={{ backgroundColor: "#FFED07",width:"100%"}} onClick={() => { this.setState({category:"quotes"}) }}>Quotes</a>
        <a className="btn create-btn" style={{ backgroundColor: "#74E03E",width:"100%"}} onClick={() => { this.setState({category:"articles"}) }}>Blogs/Articles</a>
        <a className="btn create-btn" style={{ backgroundColor: "#0000FF",width:"100%"}} onClick={() => { this.setState({category:"fanfiction"}) }}>Fan-Fiction</a>
        <a className="btn create-btn" style={{ backgroundColor: "#2E2B5F",width:"100%"}} onClick={() => { this.setState({category:"audio"}) }}>Audio</a>
        <a className="btn create-btn" style={{ backgroundColor: "#8B00FF",width:"100%"}} onClick={() => { this.setState({category:"scripts"}) }}>Scripts</a>
        </div>
    }


  
    render(){
        return <div><Header title="MY SHELF" />
        <div className="container-fluid">
            <div className="col-sm-3 myshelfBtns">
            {this.SelectButtons()}
            </div>
            <ShelfResults category={this.state.category} key={this.state.category}/>
        </div>
        </div>
    }
}
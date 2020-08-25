import React from "react";
import { useHistory } from "react-router";
import db from "../database/db";
import * as firebase from 'firebase';
import Zoom from "@material-ui/core/Zoom";

const categoryPathName = {
    "stories": "Story",
    "poems": "Poem",
    "quotes": "Quote",
    "articles": "Article",
    "fanfiction": "Fanfiction",
    "audio": "Audio",
    "scripts": "Script"
};





export function ShelfTab(myprops) {
    const history = useHistory();
    const path  = myprops.cobj[2]=="Quote" ? "&QuoteId=" : "&StoryId=" ; 
    return <Zoom in={true}><div className="draft-cont pointer" onClick={() => {
        history.push({
            pathname: myprops.cobj[2]=="Quote" ? '/ReadQuote' : '/ReadStory',
            search: "?title=" + myprops.cobj[2] + path + myprops.cobj[1],
            state: {
                title: myprops.cobj[2],
                id: myprops.cobj[1],
            }
        })
    }}>
        <a style={{ textDecoration: "none", color: "black" }} >
            <div className="container-inner myshadow rounded" style={{ borderRadius: "2px", backgroundColor: "", padding: "20px", margin: "20px" }}>
                <div className="" style={{ width: "auto", backgroundColor: "", textAlign: "center" }}>
                    <img className="draft-image sm-cover" src={myprops.cobj[0].coverid && myprops.cobj[0].coverid !== "" ? myprops.cobj[0].coverid : process.env.PUBLIC_URL + '/ScribbleBow.png'} alt="Cover " style={{ padding: "10px" }}></img>
                    <div className="draft-title" >

                        {myprops.cobj[0].title ? <h4>{'"' + myprops.cobj[0].title + '"'}</h4> : null}
                        <p>{myprops.cobj[0].creator}</p>

                    </div>

                </div>

            </div>
        </a>
    </div>
    </Zoom>
}
export class ShelfResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = { res: [], ids: "" };
    }

    shouldComponentUpdate(NextProps, NextState) {
        if (this.props === NextProps && NextState.ids === this.state.ids) {
            return false;
        }
        return true;
    }


    render() {
        var res = [];
        var ids = "";
        console.log("retrieving")
        db.firestore().collection("myshelf").doc(localStorage.getItem("username")).get().then((snapshot) => {
            var shelfList = snapshot.data()[this.props.category];
            console.log(shelfList);
            
            if(shelfList && shelfList.length>0){
            db.firestore().collection(this.props.category).where(firebase.firestore.FieldPath.documentId(), "in", shelfList).get().then((docs) => {
                docs.forEach(doc => {
                    res.push([doc.data(), doc.id,categoryPathName[this.props.category]]);
                    ids += doc.id;
                });
                this.setState({ res: res, ids: ids });
                console.log(ids,docs)
            })
        }else{
            this.setState({res:[],ids:"0"});
        }

        });

        


        if (this.state.ids === "") {
            return <div className="col-sm-9">
                <img align="center" alt="loading" style={{ marginTop:"10%",display: "block", marginLeft: "auto", marginRight: "auto",height:"70px", width:"auto"}} src={process.env.PUBLIC_URL + '/ripple-nobg.gif'} />
                <p align="center">Retrieving the {this.props.category} in your shelf...</p>
            </div>
        }
        else {
            return <div className="col-sm-9 myscroller-notrack" style={{ height: "70vh", display: "flex", flexWrap: "wrap", overflowY: "auto" }}>
                {this.state.ids==="0"?<div style={{  display: "block", marginLeft: "auto", marginRight: "auto",marginTop:"10%",textAlign:"center"}}><i align="center" className='far fa-frown' style={{fontSize:"72px",color:"#f5ba13",opacity:"0.5",marginBottom:"20px"}}></i><p align="center" >You haven't added any {this.props.category} to your shelf yet!</p></div>:this.state.res.map((data)=>{return <ShelfTab cobj = {data}/>})}
                
                
            </div>
        }
    }
}
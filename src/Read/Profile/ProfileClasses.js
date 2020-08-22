import React, { useState, memo } from "react";
import db from "../../database/db";
import { Redirect } from "react-router";
import * as Atts from '../../Write/Story/Atts' ;
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import * as icons from 'react-icons/md';  
import {Caption} from '../../components/Loading'   ; 
    




class CategoryAll extends React.PureComponent{
    
    

   constructor(props){
       super(props);
       this.state = {r:0,id:"",exist:0,t:0,tabs:[] , switchToDrafts: false , edit:false , shouldDelete:{ id:"" ,Storytitle:"" ,  state:false} , 
       LoadingStatement:"Loading '" + Atts.documentName[this.props.category] +"'"};
       
       
   }

   shouldComponentUpdate(NextProps,NextState){
    if(this.props===NextProps 
        && this.state.t===NextState.t 
        && this.state.id===NextState.id
        && this.state.switchToDrafts === NextState.switchToDrafts
        && this.state.shouldDelete.id === NextState.shouldDelete.id){
        console.log(this.state.t);
        return false;
    }
    return true;
   }

    SameCurrentUser = this.props.UserId === localStorage.getItem("username") ? true : false ; 

    Tabs=(myprops)=>
{
   
    console.log(myprops) ;  
    return <div className="draft-cont">
    <a style={{textDecoration:"none",color:"black"}}>
    <div className= "container-inner myborder" style={{ borderRadius: "2px",backgroundColor:"" , padding:"20px", margin:"5px" , minWidth:250 , minHeight:250 }}>
    <div className = ""  style = {{ backgroundColor:"" , justifyContent:"center" , display:"flex"}}>
    <img  className="draft-image" src = {myprops[0].coverid? myprops[0].coverid:process.env.PUBLIC_URL + '/ScribbleBow.png'} alt = "Cover " style = {{width:160, maxWidth:160,height:160*1.5, maxHeight:"277"}}></img>
    <div className="draft-title" style={{backgroundColor:"" , width:160 , height:160}}>
        <h5><strong>{myprops[0].title}</strong></h5>
        <div className="handy" style={{display:"flex", justifyContent:"space-evenly" }} >
            {this.SameCurrentUser ? <a  onClick={()=>{this.setState({id:myprops[1], edit:true});console.log("clicked")}}>Edit</a>: null}
            <a  onClick={()=>{this.setState({id:myprops[1] , edit:false});console.log("clicked")}} >{this.state.switchToDrafts?null:"Read"}</a>
            { this.state.switchToDrafts && this.SameCurrentUser?  <a  style={{color:"#E61D42"}}   data-toggle="modal" data-target="#DeleteModal" onClick={()=>{this.setState({ shouldDelete:{id:myprops[1] , Storytitle:myprops[0].title} }); console.log(this.state.shouldDelete)}}>Delete</a> :null }
           
        </div>

        {!this.state.switchToDrafts ?<div className = "container-inner" style={{display:"flex", justifyContent:"space-evenly" , marginTop:"20px"}} >
        <div className= "" style = {{color:"#E61D42"}} >
        <icons.MdFavorite size="30" /><Caption caption={myprops[0].nlikes}/></div>
        <div className= ""  style = {{color: "blue"}}> 
        <icons.MdComment  size="30" /><Caption caption={myprops[0].ncomments}/></div>
        </div>: null}

        
        
    </div>
    
    </div>
   
    </div>
    </a>
    </div> ; 
}
Switch = () => {
    return <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Published</Grid>
        <Grid item>
            <Switch size="small" checked={this.state.switchToDrafts} onChange={() => { this.setState({ switchToDrafts: !this.state.switchToDrafts ,t:0 , LoadingStatement: !this.state.switchToDrafts?"Loading "+this.props.category+" Drafts": "Loading "+Atts.documentName[this.props.category] }); }} color="primary" /></Grid>
        <Grid item>Drafts</Grid>
    </Grid> 
}

    
    
    render() {
        
        console.log("Hello");
        let snapshot  = db.firestore()
        .collection( Atts.documentName[this.props.category])
        .where("creator","==",this.props.UserId) ;
        
        snapshot = snapshot.where("published","==" ,!this.state.switchToDrafts) ;
         
        snapshot
        .get()
        .then(querySnapshot => {
            this.setState({tabs:[]});
            var ntabs=[]
            
            
            querySnapshot.forEach(function(doc) {
                const d = [doc.data(),doc.id]; 
                ntabs.push(d);
            
            });
            
            
            if(ntabs.length===0){
                this.setState({r:2});
            }
           this.setState({tabs:ntabs});
           
        })
        .catch(function(error) {
            if(error){
                console.log("Error getting documents: ", error);
            }else{
                console.log("recieved without errors");
            }
           
        });
        
        setTimeout(()=>{this.setState({t:2})},2000);

        if(this.state.t===0){
            return <div>
                { this.props.UserId === localStorage.getItem('username') ?<this.Switch />:null}  
            <div className="container" align="center">
            <img align="center" alt="loading" src={process.env.PUBLIC_URL + '/ripple-nobg.gif'}/>
            <br/>
            <h3>{this.state.LoadingStatement}</h3></div>

            </div> 
        }else{
            if(this.state.id===""){
                return (

                    <div>
                        <div>
                            <div id="DeleteModal" className="modal fade" role="dialog" style={{marginTop:"200px"}}>
                                    <div className="modal-dialog" >
                                        <div className="modal-content" >
                                        <div className="modal-header">
                                            <strong  style={{color:"red"}}>Delete {this.props.category}</strong>
                                        </div>
                                        <div className="modal-body" >
                                                Do you Really Want to Delete the {this.props.category}  <strong>"{this.state.shouldDelete.Storytitle}"</strong> 
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal"b
                                            onClick={()=>{
                                                db.firestore()
                                                .collection(Atts.documentName[this.props.category])
                                                .doc(this.state.shouldDelete.id)
                                                .delete() ; 
                                                this.setState({t:0 , LoadingStatement:'Deleting "'+ this.state.shouldDelete.Storytitle+'"'}); 
                                            }}   style={{width:"100px" , marign:"5px"}}>Yes</button>
                                            <button type="button" className="btn btn-default" data-dismiss="modal" style={{width:"100px" , marign:"5px"}}>No</button>
                                        </div>
                                        </div>

                                    </div>
                                    </div>
                        </div>
                        { this.props.UserId === localStorage.getItem('username') ?<this.Switch />:null} 
                         
                            <div class="container-inner" style={{display:"flex" , justifyContent:"center"}}>
                        
                        {this.state.tabs.length===0?
                        <div className="container" align="center">
                        {this.state.r===2?<p>{ this.props.UserId === localStorage.getItem('username')? "You have no unpublished":"No unpublished "} {Atts.documentName[this.props.category]}</p>:null}
                        </div>
                        :
                        <div className = "container-inner" style={{backgroundColor:"" ,display:"flex" ,flexWrap: "wrap", justifyContent: "center" , width:"80%" }}>
                        {this.state.tabs.map(this.Tabs)}
                        </div>
                        }
                        </div>
                    </div>
                ) ; 
               
            }
            else{
                console.log(this.state.id);
                console.log(this.props.category);
                if(this.state.edit === false)
                {
                    let temp  = this.props.category == "Quote" ? "&QuoteId=" : "&StoryId="
                    return <Redirect to={{
                        pathname: this.props.category == "Quote" ? "/ReadQuote" : "/ReadStory" ,
                        search: "?title="+ this.props.category+ temp +this.state.id,
                        state: {
                            title: this.props.category,
                            id: this.state.id,
                             
                        },
                        key:{
                           title: this.props.category,
                            id: this.state.id,
                        }
                   }
                   } />
                }
                else 
                {
                    return <Redirect  to ={{
                        pathname: this.props.category == "Quote" ? "/ReadQuote" : "/ReadStory" , 
                        state: {
                            title: this.props.category,
                            id: this.state.id,
                            key:this.state.id,
                        }
                    }} />
                }
                
            }
        }

        
    }
    
}
    
export default CategoryAll;







































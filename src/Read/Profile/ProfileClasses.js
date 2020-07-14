import React, { useState, memo } from "react";
import db from "../../database/db";
import { Redirect } from "react-router";
import * as Atts from '../../Write/Story/Atts' ;

    
    
    




class CategoryAll extends React.PureComponent{
    
    

   constructor(props){
       super(props);
       this.state = {r:0,id:"",exist:0,t:0,tabs:[]};
       
       
   }

   shouldComponentUpdate(NextProps,NextState){
    if(this.props===NextProps && this.state.t===NextState.t && this.state.id===NextState.id){
        console.log(this.state.t);
        return false;
    }
    return true;

}



    Tabs=(myprops)=>
{
    console.log("imgurl is: " +myprops[2]);
    
    return (<div className="draft-cont">
    <a style={{textDecoration:"none",color:"black"}} onClick={()=>{this.setState({id:myprops[1]});console.log("clicked")}}>
    <div className= "container-inner myshadow rounded" style={{ borderRadius: "2px",backgroundColor:"" , padding:"20px", margin:"20px"}}>
    <div className = ""  style = {{width:200,backgroundColor:"" , justifyContent:"center" , display:"flex"}}>
    <img  className="draft-image" src = {myprops[2]? myprops[2]:process.env.PUBLIC_URL + '/ScribbleBow.png'} alt = "Cover " style = {{width:160, maxWidth:160,height:277, maxHeight:"277"}}></img>
    <div className="draft-title">
    <i className='fas fa-book' style={{fontSize:"36px"}}></i>
    <br />
    <h5>{myprops[0].title}</h5>
    </div>
    
    </div>
   
    </div>
    </a>
    </div>) ; 
}


GetCoverPage  = (imageId)=>
{
   
  
  const images = db.storage().ref().child('CoverPages');
    const image = images.child(imageId);
    image.getDownloadURL().then((url) => { 
      
        return url;
    });
    
    
}

    
    
    render(){
        
        if(this.props.category!=="works"){
        
            console.log("Hello");
            let snapshot  = db.firestore()
            .collection( Atts.documentName[this.props.category])
            .where("creator","==",this.props.UserId) ;
            if (this.props.UserId != localStorage.getItem('username'))
               snapshot = snapshot.where("published","==" ,true) ;
             
            snapshot
            .get()
            .then(querySnapshot => {
                this.setState({tabs:[]});
                var ntabs=[]
                
                
                querySnapshot.forEach(function(doc) {
                    const d = [doc.data(),doc.id];
                    const images = db.storage().ref().child('CoverPages');
                    const image = images.child(doc.id);
                    
                   image.getDownloadURL().then((url) => {    
                                         
                            d.push(url);
                            
                        
                    });
                    
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
        }

        
        setTimeout(()=>{this.setState({t:2})},2000);

        if(this.state.t===0){
            return <div className="container" align="center"><img align="center" alt="loading" src={process.env.PUBLIC_URL + '/ripple-nobg.gif'}/></div>
        }else{
            if(this.state.id===""){
                return <div class="container">
            {this.state.tabs.length===0?
            <div className="container" align="center">
            {this.state.r===2?<p>You have no unpublished {Atts.documentName[this.props.category]}</p>:null}
            </div>
            :
            <div className = "row container" style={{backgroundColor:"" ,display:"flex" ,flexWrap: "wrap", justifyContent: "center"}}>
            {this.state.tabs.map(this.Tabs)}
            </div>
            }
            </div>
            }
            else{
                console.log(this.state.id);
                console.log(this.props.category);
                return <Redirect to={{
                     pathname: "/ReadStory",
                     search: "?title="+ this.props.category+"&StoryId="+this.state.id,
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
        }

        
    }
    
}
    
export default CategoryAll;







































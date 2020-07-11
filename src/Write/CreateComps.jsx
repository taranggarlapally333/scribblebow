import React, { useState, memo } from "react";
import db from "../database/db";
import { Redirect } from "react-router";
import * as Atts from './Story/Atts' ;

    
    
    




class CategoryDrafts extends React.PureComponent{
    
    

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
    
    return (<div className="draft-cont">
    <a style={{textDecoration:"none",color:"black"}} onClick={()=>{this.setState({id:myprops[1]});console.log("clicked")}}>
    <div className= "container-inner myshadow rounded" style={{ borderRadius: "2px",backgroundColor:"" , padding:"20px", margin:"20px"}}>
    <div className = ""  style = {{width:200,backgroundColor:"" , justifyContent:"center" , display:"flex"}}>
    <img  className="draft-image" src = {myprops[2]? myprops[2]:process.env.PUBLIC_URL + '/ScribbleBow.png'} alt = "Cover " style = {{width:160, maxWidth:160,height:277, maxHeight:"277"}}></img>
    <div className="draft-title">
    <i className='fas fa-edit' style={{fontSize:"36px"}}></i>
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
            db.firestore()
            .collection( Atts.documentName[this.props.category])
            .where("creator","==",localStorage.getItem("username"))
            .where("published","==",false)
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
                console.log("Error getting documents: ", error);
            });
        }

        
        setTimeout(()=>{this.setState({t:2})},1000);

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
                     pathname: "/WriteStory",
                     state: {
                         title: this.props.category,
                         id: this.state.id,
                         new: false, 
                     }
                }
                } />
            }
        }

        
    }
    
}
    
export default CategoryDrafts;









































// function CategoryDrafts(props){

//     const [r,setR]=useState(0);
//     const [id,setId] = useState("");
//     const [exist,setExist]=useState(0);
//     const [tabs,setTabs] = useState([]);

//     function Tabs(props)
// {
    
//     return (<div className="col-sm-3">
//     <a onClick={()=>{setId(props[1]);console.log("changed")}}>
//     <div className= "container-inner myshadow rounded" style={{ backgroundColor:"" , padding:"20px", margin:"20px"}}>
//     <div className = "" style = {{width:200 , backgroundColor:""}}>
//     <img src = {props[0].coverid===""?"https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg":props[0].coverid} alt = "Cover " style = {{height:277 , padding:"10px"}}></img>
//     </div>
//     <h5>{props[0].title}</h5>
//     </div>
//     </a>
//     </div>) ; 
// }


    
//     if(props.category!=="works"){
        
//         console.log("Hello");
//         db.firestore()
//         .collection(props.category)
//         .where("creator","==",localStorage.getItem("username"))
//         .where("published","==",false)
//         .get()
//         .then(querySnapshot => {
            
//             setTabs([]);
//             var ntabs = [];
            
//             querySnapshot.forEach(function(doc) {
//                 const d = [doc.data(),doc.id];
//                 ntabs.push(d);
//             });
//             if(ntabs.length===0){
//                 setR(2);
//             }
//             setTabs(ntabs);
//         })
//         .catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });
//     }
//     if(id===""){
//         return <div class="container">
//     {tabs.length===0?
//     <div className="container" align="center">
//     {r===2?<p>You have no unpublished {props.category}</p>:null}
//     </div>
//     :tabs.map(Tabs)}
//     </div>
//     }
//     else{
//         return <Redirect to={{
//              pathname: "/WriteStory",
//              state: {
//                 title: props.category,
//                  id: id
//              }
//         }
//         } />
//     }
// }
    
// export default memo(CategoryDrafts);
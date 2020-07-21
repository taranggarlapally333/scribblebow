import React from 'react' ; 
import Header from '../../components/NavHeader';
import { Select, Fab, Zoom } from '@material-ui/core';
import db from '../../database/db';
import AddIcon from "@material-ui/icons/Add";
import { LoadingPage } from '../../components/Loading';
import { Redirect } from 'react-router';

class SelectSeries extends React.Component
{
    constructor(props)
    {
        super(props) ; 
        this.state = { AllSeriesTitles:[] , zoom:false , stage:0 , SeriesId:null , part:null}
    }

    GetAllSeriesTitles = function(UserId)
    {
            db.firestore().collection("StorySeries").doc(UserId)
            .get()
            .then( qs=>{
                console.log(qs) ; 
            })
    }

    render()
    {
        
        let allProps = {
            ...this.props.location.state 
        }
        if(this.state.stage == 0 )
        {
            return(
                <div>
                    <Header title="Story Series"/>
                    <div className="container" style={{display:"flex" , justifyContent:"center"}}>
                    <div  >
                            <div style={{display:"flex" , justifyContent:"space-evenly" , width:"400px" , backgroundColor:""}}>
                                <button className= "btn btn-danger"
                                    onClick={()=>{
                                        this.setState({stage:5}) ; 
                                    }}
                                    
                                >Single Story</button>
                                <button className= "btn btn-warning"   onClick={()=>{
                                    if(this.state.AllSeriesTitles.length === 0 )
                                        document.getElementById("StorySeriesList").style.display = "block" ; 
                                    else 
                                    {
                                        document.getElementById("newSeries").style.display = "block" ; 
                                    
                                    }

                                    this.setState({zoom:true}) ; 
                                   
                                }}>Story Series</button>
                                
                            </div>
                           <hr></hr>
                            <div id="StorySeriesList"  style={{display:"none"}}>
                                
                                <form>
                                    <label>Select Your Story Series <Zoom in={this.state.zoom}>
                                            <Fab style={{
                                            background: "#f5ba13", 
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "36px",
                                            height: "36px",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                                            cursor: "pointer",
                                            outline: "none",
                                            fontSize: "36px", marginLeft:"200px"
                                        }} onClick={()=>{
                                            this.setState({stage:6})
                                        }} >
                                                    <AddIcon style={{ fontSize: 24 }} />
                                                </Fab>
                                    </Zoom></label>
                                    
                            
                                    <select className="form-control">
                                        <option>okok</option>
                                        <option>okok</option>
                                    </select>
                                    <button>Start Writing</button>
                                </form>
                            </div>
                            <div id="newSeries" style={{display:"none"}}>
                                <label>No Series Yet, Want to Start a New One <Zoom in={this.state.zoom}>
                                            <Fab style={{
                                            background: "#f5ba13", 
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "36px",
                                            height: "36px",
                                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                                            cursor: "pointer",
                                            outline: "none",
                                            fontSize: "36px", marginLeft:"20px"
                                        }} onClick={()=>{
                                            this.setState({stage:6})
                                        }} >
                                                    <AddIcon style={{ fontSize: 24 }} />
                                                </Fab>
                                    </Zoom></label>
                            
                                
                            </div>

                    </div>
                    </div>
                    
                    
                </div>
                ); 
        }
        else if (this.state.stage ===5 )
        {
            return <Redirect 
                to={{
                    pathname:"/WriteStory" , 
                    state :{ ...this.props.location.state},
                    key :{...this.props.location.state}
                }}
            />
        }
        else if (this.state.stage === 6)
        {
            return <Redirect 
            to={{
                pathname:"/WriteStory" , 
                state :{ ...this.props.location.state , 
                     "SeriesId": "1594476767505" , 
                     "part":"3" , 

                 },
                key :{...this.props.location.state, "SeriesId": "1594476767505" , 
                     "part":"3" ,}
            }}
        />
        }
        else 
        {
            return  <LoadingPage /> ; 
        }
        
    }
}

export default SelectSeries ; 
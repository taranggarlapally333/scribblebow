import React, { useState } from 'react' ; 
import * as Atts from '../Story/Atts' ; 
import { Fab } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
export default function QuoteEditor(props)
{

    
    //all Component Variables----------------------------------------------------------------------------------
    const UploadImage  =  <div>
                <input type="file" 
                name = "QuoteCoverPage" 
                onChange={handleImageChange}
                id = "fileInput" style={{display:"none"}}></input>
                <div className= "col-md-3">
                    <div  style = {{ justifyContent:"center" }}
                    onClick={()=>{
                        document.getElementById("fileInput").click() ; 
                    }} >
                    <img  
                    className="myshadow myimage"
                    id = "previewImage" src ={process.env.PUBLIC_URL+"ScribbleBow.png"} alt = "Cover " style = {{ 
                        minWidth:160,maxWidth:160,maxHeight:160}}></img>
                    </div>
                </div>
            </div> ; 
    

    //end-Component Varibles----------------------------------------------------------------------------------
    //STATE VARIABLES 
    const [Image , setImage] = useState(null)  ; 
    const [ImageProps , setImageprops] = useState(
        {
            imageUrl : "url(" +  process.env.PUBLIC_URL + "ScribbleBow.png" + ")" , 
            LinearGrad : "" , 
            UpSlider:0 , 
            DownSlider:0 
        }
    ) ; 

    const [QuoteStatus , setQuoteStatus] = useState({
        QuoteContent : "" , 
        fontSize: "20px" , 
        fontStyle:"none" , 
        bold: false,
        italic:false, 
        fontColor: "black", 
        brightness:100


    })
    //END OF STATE VARIABLES 
    function handleQuoteStatus(event)
    {
        var {name,value} = event.target;
        switch(name)
        {
            case "QuoteContent" : let tempVal  = value  ;
                            console.log(tempVal.split('\n').length) ; 
                            console.log(tempVal.length);
                            if (tempVal.length > 735) value  = "" ;  
                            if(tempVal.split('\n').length-1 > 14) { value="" ;}   
        }
        setQuoteStatus(preprops =>{
            return {
                ...preprops , 
                [name]:value 
            }
        })

       
    }
    function handleImageChange(event)
    {
        var ImageFile =event.target.files[0] ;  
        if(event.target.files[0])
        {
            
            console.log(ImageFile.size[0]) ; 
            setImage(ImageFile) ;
            const reader = new FileReader() ; 
            reader.addEventListener("load" , function(){
                let CoverPageElement = document.getElementById("previewImage") ; 
                let QuoteEditArea = document.getElementById("QuoteEditArea") ; 

                CoverPageElement.setAttribute("src" , this.result) ; 
                setImageprops(preProps=>{
                    return {...preProps , imageUrl :"url(" + this.result+ ")" }
                }) ; 
                let temp = "" ; 
                if(ImageProps.LinearGrad != "") temp = " ,"
                QuoteEditArea.style.backgroundImage = ImageProps.LinearGrad + temp+ "url(" + this.result+ ")" ; 
                console.log(ImageProps.LinearGrad + " ,url(" + this.result+ ")" ) ; 
            }); 
            reader.readAsDataURL(ImageFile) ; 
         
        }
        
    }

    return (
        <div>
            <div className ="col-12 col-md-3"  style={{backgroundColor:"lightgray"}}>
                
                <div style={{display:"flex" , justifyContent:"space-evenly"}}>
                <button className="btn btn-default" style={{margin:"5px "}}>Reset</button>
                <button className="btn btn-warning" style={{margin:"5px "}}>Publish</button>
                <button className="btn btn-primary" style={{margin:"5px "}}>Save</button>
                </div>
                <form>
                    <h4>Quote</h4>
                    <textarea className="form-control" placeholder="Enter Your Quote Here" id= "QuoteContent"
                    rows="10"
                    name = "QuoteContent"
                    onChange = {handleQuoteStatus}
                    style={{resize:"vertical"}}>
                    </textarea>
                    <h3>Image Settings</h3>
                    <h4>Brightness</h4>
                    <Slider
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChange={(event , val )=>{
                            setQuoteStatus(preprops=>{
                                return {...preprops , 
                                brightness : 100 + val*10}
                            })
                        }}
                        step={1}
                        marks
                        min={-5}
                        max={5}
                        
                    />
                    <h4>Contrast</h4>
                    <div>
                        <h5>Up</h5> 
                        <Slider 
                        defaultValue={0}
                        id = "UpContrast"
                        onChange={(event, val )=>{
                                let QuoteEditArea = document.getElementById("QuoteEditArea") ; 
                                let DownContrast = ImageProps.DownSlider ; 
                                let theUpValue  = val  ; 
                                if (theUpValue > 5)
                                    event.target.value  = 5  ; 
                                if (theUpValue <= 0)
                                    event.target.value  = 0  ; 
                                    setImageprops( preprops =>{
                                    return { ...preprops , 
                                    LinearGrad: "linear-gradient( rgba(0, 0, 0, "+ theUpValue*(0.1)  + "), rgba(0, 0, 0, "+ DownContrast*(0.1) +") )" , 
                                    UpSlider: theUpValue
                                    }
                                }
                                ) ; 
                                QuoteEditArea.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, "+ theUpValue*(0.1)  + "), rgba(0, 0, 0, "+ DownContrast*(0.1) +") ) ," +  ImageProps.imageUrl ; 
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={5}
                        />
                        <h5>Down</h5> <Slider
                        defaultValue={0}
                        id = "DownContrast"
                        onChange={(event , val )=>{
                                let QuoteEditArea = document.getElementById("QuoteEditArea") ; 
                                let UpContrast = ImageProps.UpSlider ; 
                                let theDownValue  = val  ; 
                                if (theDownValue > 5)
                                    event.target.value  = 5  ; 
                                if (theDownValue <= 0 )
                                    event.target.value  = 0  ;
                                setImageprops( preprops =>{
                                    return { ...preprops , 
                                    LinearGrad:"linear-gradient( rgba(0, 0, 0, "+ UpContrast*(0.1)  + "), rgba(0, 0, 0, "+  theDownValue*(0.1) +") )" , 
                                    DownSlider :theDownValue
                                    }
                                }
                                ) ;  
                                console.log(ImageProps)
                                QuoteEditArea.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, "+ UpContrast*(0.1)  + "), rgba(0, 0, 0, "+  theDownValue*(0.1) +") ) ," + ImageProps.imageUrl ; 
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={5}
                        
                    />
                    </div>
                    <div>
                    <h3>Font Settings</h3> 
                        <div className="handy" style={{display:"flex" , justifyContent:"space-around"}}>
                        <h4 onClick= {()=>{
                         setQuoteStatus(preprops=>{
                             return({...preprops , bold: !QuoteStatus.bold})
                         })
                      }}   style={{ fontWeight:QuoteStatus.bold ? "bold": "" }} >B</h4>
                      <h4 onClick = {()=>{
                          setQuoteStatus(preprops=>{
                             return({...preprops , italic: !QuoteStatus.italic})
                         })
                      }} style={{ fontStyle:QuoteStatus.italic ? "italic": ""  }}  >I</h4>
                        </div>
                        <h4>Size</h4>
                        <Slider onChange={(event , val)=>{
                            
                            setQuoteStatus(preprops =>{
                                return {...preprops  , fontSize:val}
                            })

                        }} aria-labelledby="continuous-slider" />
                        <h4>Color</h4>
                        <div style={{ overflowX:"auto"}}>
                            {Atts.categoryAvailable.map((eachCat , index)=>{
                                return ( <Fab key= {index} color="primary" size="small" style={{backgroundColor : Atts.categoryColors[eachCat] , margin:"5px"}} onClick ={()=>{
                                     setQuoteStatus(preprops =>{
                                         return {...preprops , 
                                         fontColor : Atts.categoryColors[eachCat]} 
                                     })
                                }} />)
                                

                            } )}
                            <Fab size="small" style={{backgroundColor :"white", margin:"5px"}} onClick ={()=>{
                                     setQuoteStatus(preprops =>{
                                         return {...preprops , 
                                         fontColor :"white"} 
                                     })
                                }} />
                            <Fab size="small" style={{backgroundColor :"black", margin:"5px"}} onClick ={()=>{
                                    setQuoteStatus(preprops =>{
                                        return {...preprops , 
                                        fontColor :"black"} 
                                    })
                            }} />
                        </div>
                     
                    </div>
                    
                    <h4>UploadImage</h4>
                    {UploadImage}
                   
                   
                </form>
            </div>
            <div className= "col-md-9 " style = {{backgroundColor:"", padding:"10px" , display:"flex" , justifyContent:"center"}}>
                <div className="myshadow" > 
                    <div className="QuoteEditArea" id="QuoteEditArea"  style={{fontSize: QuoteStatus.fontSize ,  fontWeight:QuoteStatus.bold ? "bold": "" , color: QuoteStatus.fontColor , 
                    fontStyle:QuoteStatus.italic ? "italic": "" , 
                    filter: "brightness(" + QuoteStatus.brightness + "%)"}}  >
                        <p>{QuoteStatus.QuoteContent}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
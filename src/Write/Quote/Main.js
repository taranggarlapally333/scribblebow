import React from 'react' ; 
import * as QuoteComps from './QuoteComps' ; 
import Header from '../../components/NavHeader' ;
import db from '../../database/db'; 
import Loading from '../../components/Loading';
import { documentName } from '../Story/Atts';
class WriteQuote extends React.Component
{
    constructor(props)
    {
        super(props) ; 
        this.state = { QuoteDetails :{
        
            QuoteContent : "" , 
            fontSize: "20px" , 
            fontStyle:"none" , 
            bold: false,
            italic:false, 
            fontColor: "black", 
            brightness:100,
            coverid:"",
            upContrast : 0  , 
            downContrast : 0 ,
            ncomments: 0 , 
            nlikes : 0 , 
            

        } , stage : 0 , id :"" }
    }
    shouldComponentUpdate(nextProps , nextState)
    {
         if(this.props == nextProps && 
            this.state.id == nextState.id && 
            this.state.stage == nextState.stage) return false ; 
        else  return true  ; 
    }
    getQuoteDetails(collecName , QuoteId)
    {
        db.firestore().collection(collecName).doc(QuoteId).get().then(qs =>{

            let tempdata = { 
                QuoteContent : qs.data().quotecontent ,   
             ...qs.data(), 
            }

            this.setState({ QuoteDetails: tempdata ,  stage  : 4 , id : qs.id   }) ; 
        })
    }
    render()
    {
        

        if (this.props.location.state.new)
        {
            return (<div>
                <Header title= "Quote" />
                <QuoteComps.default 
                    new  ={true}  
                    Details = {this.state.QuoteDetails} 
                    title = {this.props.location.state.title}            
                  />
            </div>)
        }
        else {
        console.log("I AM OLD") ; 
        this.getQuoteDetails(documentName[this.props.location.state.title], this.props.location.state.id) ; 
        if(this.state.stage == 4 )
        {
            return (<div>
                <Header title= "Quote" />
                <QuoteComps.default 
                    new  ={false}  
                    Details = {this.state.QuoteDetails} 
                    title = {this.props.location.state.title} 
                    QuoteId = { this.props.location.state.id}         
                  />
            </div>)
        }
        if(this.state.stage == 0 )
        {
            return <Loading message = "Loading" /> ;
        }}
        
        
    }
}

export default WriteQuote ; 
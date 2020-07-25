import React from 'react' ; 
import Header from '../../components/NavHeader';
import SnackbarProvider from 'react-simple-snackbar'
import SnackBar from '../../components/SnackBar'; 
function Reports()
{
    var Reports = <p className= "FitToContent" style={{backgroundColor:""  ,whiteSpace:"pre-wrap", padding:"10px" ,boxShadow:"0px 2px 4px 0px lightgray" }}>
    <h4 className= "FitToContent" >Home Page</h4>
    <p className= "FitToContent" style={{backgroundColor:""}}>The Present Home Page has to be Updated and also good User adsfadsfgsaasdfasdfasdfasdgfsagasdf asdfasdf asdfasdf asdfsadf asdg</p>
</p> ; 
    return(
        <div>
            <Header title="Report" />
            <div className="container" style={{display:"flex" , justifyContent:"center"}}>
                <div className=" " style={{position:""}}>
                    <form className="create-note">
                        <input  placeholder="Title" style={{borderBottom:"0" , borderBottomColor:"white"}}></input>
                        <textarea rows="10" placeholder="Report Issue"></textarea>
                        <SnackbarProvider>
                            <SnackBar />
                        </SnackbarProvider>
                        <button className="btn btn-danger" style={{ position:"relative", margin:"10px" , width:"200px"}}
                        onClick={()=>{

                        }}
                        >Report</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Reports ; 
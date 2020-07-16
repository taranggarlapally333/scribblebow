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
            <div className="container ">
                <div className="col-12 col-md-6" style={{padding:"10px"}}>
                    <div className="container-inner" style={{padding:"10px", width:"auto" ,wordWrap:"break-word" ,textJustify:"newspaper"}}>
                        FROM: {localStorage.getItem('email')}
                        <hr></hr> 
                    </div>
                    <div className="container-inner myscroller" style={{height:"300px",overflowY:"auto",wordWrap:"break-word" ,textJustify:"newspaper" , padding:"10px" }}>
                                <SnackbarProvider>
                                <SnackBar/>
                                </SnackbarProvider>
                    </div>
                </div>

                
                <div className="col-12 col-md-6 " style={{position:""}}>
                    <form className="create-note">
                        <input  placeholder="Title" style={{borderBottom:"0" , borderBottomColor:"white"}}></input>
                        <textarea rows="10" placeholder="Report Issue"></textarea>
                        <button className="btn btn-danger" style={{ position:"relative", margin:"10px" , width:"200px"}}>Report</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Reports ; 
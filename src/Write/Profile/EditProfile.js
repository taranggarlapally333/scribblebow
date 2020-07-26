import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import db from '../../database/db';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContent } from '@material-ui/core';

export function EditProfileComp(props) {
    const [newdata, setNewData] = useState({
        fname: props.user.fname,
        lname: props.user.lname,
        bio: props.user.bio,
        website: props.user.website ? props.user.website : "",
        title: props.user.title,
        mobile: props.user.mobile ? props.user.mobile : "",
        audio: props.user.audio,
        
    });
    const [open,setOpen] = useState(false);
   


    function Subs(ctitle) {
        var title = ctitle;
        title = title.split("");
        var l = title.length;
        var ss = [];
        for (var i = 0; i < l; i++) {
            var x = title[i];
            ss.push(x);
            for (var j = i + 1; j < l; j++) {

                x += title[j];
                ss.push(x);
            }

        }
        return ss;
    }
   


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    function handleSubmit(event) {
        event.preventDefault();
        var tname =newdata.fname+" "+newdata.lname;
        tname = tname.toLowerCase();
        const userkeys = Subs(tname);
        
        
        db.firestore().collection("users").doc(localStorage.getItem("username")).update({
            userkeys:userkeys
        })
        
        db.firestore().collection("users").doc(localStorage.getItem("username")).update(newdata).then(error=>{
            if(error){
                alert("error");
            }else{
               setOpen(true);
            }
        });
     
    }

    function handleClose(){
        setOpen(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNewData(prevData => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }

    return (

        <div>
            <img alt="profile pic" className="editPcontent myshadow2" style={{ marginTop: "-75px", borderRadius: "50%", height: "150px", width: "150px" }} src={props.user.profileimg === "" ? process.env.PUBLIC_URL + '/ScribbleBow.png' : props.user.profileimg} />

            <div className="editPcontent" style={{ overflowY: "auto", marginTop: "40px", marginBottom: "5px", width: "500px", paddingTop: "20px" }}>
                <form className="editPcontent" onSubmit={handleSubmit}>
                <div className="container editPcontent" style={{ width: "500px" }}>
            <div className="col-sm-6">
                <h4 className="font0"><b>First Name</b></h4>
            </div>
            <div className="col-sm-6 form-group">
                <TextField id="standard-basic" placeholder="Your First Name" name="fname" autocomplete="off" value={newdata.fname} onChange={handleChange} InputProps={{ disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} />
            </div>
        </div>
        <div className="container editPcontent" style={{ width: "500px" }}>
            <div className="col-sm-6">
                <h4 className="font0"><b>Last Name</b></h4>
            </div>
            <div className="col-sm-6 form-group">
                <TextField id="standard-basic" placeholder="Your Last Name" name="lname" autocomplete="off" value={newdata.lname} onChange={handleChange} InputProps={{ disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} />
            </div>
        </div>
        <div className="container editPcontent" style={{ width: "500px" }}>
            <div className="col-sm-6">
                <h4 className="font0"><b>Bio</b></h4>
            </div>
            <div className="col-sm-6 form-group">
                <TextField id="standard-basic" placeholder="Say something about yourself" name="bio" autocomplete="off" value={newdata.bio} onChange={handleChange} InputProps={{ disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} />
            </div>
        </div>
        <div className="container editPcontent" style={{ width: "500px" }}>
            <div className="col-sm-6">
                <h4 className="font0"><b>Mobile</b></h4>
            </div>
            <div className="col-sm-6 form-group">
                <TextField id="standard-basic" placeholder="Your Mobile Number" name="mobile" autocomplete="off" value={newdata.mobile} onChange={handleChange} InputProps={{ disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} />
            </div>
        </div>
        <div className="container editPcontent" style={{ width: "500px" }}>
            <div className="col-sm-6">
                <h4 className="font0"><b>Website</b></h4>
            </div>
            <div className="col-sm-6 form-group">
                <TextField id="standard-basic" type="url" placeholder="http://www.example.com" name="website" autocomplete="off" value={newdata.website} onChange={handleChange} InputProps={{ disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} />
            </div>
        </div>

                    <div className="container editPcontent" style={{ width: "500px" }}>
                        <div className="col-sm-6">
                            <h4 className="font0"><b>I am a/an</b></h4>
                        </div>
                        
                       
                        <div className="col-sm-6 form-group">
                        <Select
                        name="title" autocomplete="false" value={newdata.title} onChange={handleChange} InputProps={{  'aria-label': 'Without label', disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }}                    
                            displayEmpty
                        >
                            
                            <MenuItem value={"Creator (Default)"} >Creator (Default)</MenuItem>
                            <MenuItem value={"Author"}>Author</MenuItem>
                            <MenuItem value={"Poet"}>Poet</MenuItem>
                            <MenuItem value={"Speaker"}>Speaker</MenuItem>
                            <MenuItem value={"Singer"}>Singer</MenuItem>
                            <MenuItem value={"Content Creator"}>Content Creator</MenuItem>
                            <MenuItem value={"Film Maker"}>Film Maker</MenuItem>
                        </Select>
                        </div>
                    </div>
                   


                    
                    <div className="container editPcontent" style={{ width: "500px" }}>
                        <div className="col-sm-6 form-group">
                            <h4 className="font0"><b>AudioBow</b><br />{newdata.audio>0?null:<small>Unlock this feature by publishing audio content!</small>}</h4>
                        </div>
                        <div className="col-sm-6 form-group">
                            <img alt="music" className={newdata.audio>0?"pointer":"not-allowed"} style={{ height: "50px", width: "25px", background: "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)" }} src={process.env.PUBLIC_URL + '/mic.png'} />
                        </div>
                    </div>
                    <div className="container editPcontent" style={{ width: "500px", paddingBottom: "10px" }}>
                        <button className="btn btn-primary editPcontent" type="submit" style={{ float: "right" }}>Save Changes</button>
                    </div>
                </form>

            </div>
          
            <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        
        >
  <SnackbarContent style={{
      backgroundColor:'#4BB543',
      fontSize: 14
    }}
    message={<span id="client-snackbar"><i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;Your profile has been updated</span>}
    action={
          <React.Fragment>
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
  />
             

        </Snackbar>

       

        </div>

    )
}

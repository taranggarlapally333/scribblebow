import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

export default class EditSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:0,aswitch:false,bswitch:false,cswitch:false};
    }

  
     handleChange = (event, newValue) => {
        this.setState({value:newValue});
      };



      setCat = ()=>{
          if(this.state.value===0){
              return <div className="editPcontent" style={{ overflowY: "auto", marginTop: "40px", marginBottom: "5px", width: "500px", paddingTop: "20px" }}>
              <div className="container editPcontent" style={{ width: "500px"}}>
              <div className="col-sm-10">
              <p className="editPcontent font0" >Who can message you?</p>
              </div>
              <div className="col-sm-2">
              <Select
                        name="title" autocomplete="false" InputProps={{  'aria-label': 'Without label', disableUnderline: true, style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }}                    
                            displayEmpty
                        >
                            
                            <MenuItem value={"followers"} >Only Followers</MenuItem>
                            <MenuItem value={"Anyone"}>Anyone</MenuItem>
                            <MenuItem value={"None"}>No one</MenuItem>
                            
                        </Select>
              </div>
              </div>
              <div className="container editPcontent" style={{ width: "500px"}}>
              <div className="col-sm-10">
              <p className="editPcontent font0" >Make Profile Private</p>
              </div>
              <div className="col-sm-2">
              <Switch size="small" checked={this.state.aswitch} onChange={() => { this.setState({aswitch: !this.state.aswitch}); }} color="primary" />
              </div>
              </div>
              <div className="container editPcontent" style={{ width: "500px"}}>
              <div className="col-sm-10">
              <p className="editPcontent font0" >Make all contents Private</p>
              </div>
              <div className="col-sm-2">
              <Switch size="small" checked={this.state.bswitch} onChange={() => { this.setState({bswitch: !this.state.bswitch}); }} color="primary" />
              </div>
              </div>
             </div>
          }
          else if(this.state.value===1){
              return <div className="editPcontent" style={{ overflowY: "auto", marginTop: "40px", marginBottom: "5px", width: "500px", paddingTop: "20px" }}>
              <div className="container editPcontent" style={{ width: "500px"}}>
              
              <p className="editPcontent font0" >Change Password</p>
              

              <TextField id="standard-basic" placeholder="Old Password" name="oldpwd" autocomplete="off" InputProps={{ style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} /><br />
              <TextField id="standard-basic" placeholder="New Password" name="newpwd" autocomplete="off" InputProps={{ style: { fontSize: 16, fontFamily: "Josefin Sans, sans-serif" } }} /><br />
              <button className="btn btn-primary font0 btn-sm" style={{marginTop:"5px"}} type="submit">Update</button>             
              </div>

              <div className="container editPcontent" style={{ width: "500px"}}>
              <br />
              <br />
              <button  className="btn btn-primary btn-danger font0 btn-sm">Make Profile Private</button>
             
              </div>
             
             </div>
          }else{
              return  <div className="editPcontent" style={{ overflowY: "auto", marginTop: "40px", marginBottom: "5px", width: "500px", paddingTop: "20px" }}>
              <div className="container editPcontent" style={{ width: "500px"}}>
              <div className="col-sm-10">
              <p className="editPcontent font0" >Turn off notifications</p>
              </div>
              <div className="col-sm-2">
              <Switch size="small" checked={this.state.cswitch} onChange={() => { this.setState({cswitch: !this.state.cswitch}); }} color="primary" />
              </div>
              </div>
              </div>

          }
      }


render(){
    return <div>
        <img alt="profile pic" className="editPcontent myshadow2" style={{ backgroundColor: "#f5ba13", marginTop: "-75px",marginBottom:"20px", borderRadius: "50%", height: "150px", width: "150px" }} src={process.env.PUBLIC_URL + '/gear.png'} />
    
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor='primary'
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label={<span className="tabfont font0">Privacy</span>} />
        <Tab label={<span className="tabfont font0">Security</span>} />
        <Tab label={<span className="tabfont font0">Notifications</span>} />
      </Tabs>
      {this.setCat()}
    </div>
}
    
}
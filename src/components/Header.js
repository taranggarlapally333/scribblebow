import React from 'react' ; 
import { Nav, Navbar, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';
function Header(props)
{
    
    const history= useHistory();
    return (
        <header className= "row myheader">
        <img className="header-logo" onClick = {()=>history.push("/")} src={process.env.PUBLIC_URL + '/myimage.png'} />
            <h1>{props.title}</h1>
            
        </header>
        
    ); 
}
export default Header ; 
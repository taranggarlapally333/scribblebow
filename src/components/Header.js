import React from 'react' ; 
import { Nav, Navbar, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
function Header(props)
{
    return (
        <header className= "row myheader">
            <h1>{props.title}</h1>
        </header>
        
    ); 
}
export default Header ; 
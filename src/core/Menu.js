import React from 'react';
import {Link, withRouter} from 'react-router-dom';
//import {FormControl, Button, Badge} from 'react-bootstrap';
import { BoxArrowInLeft, BoxArrowInRight, PersonPlus} from 'react-bootstrap-icons';
import {signout, isAuthenticated} from '../auth'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const iconSize = 20;

const isActive = (history, path) => {
  if(Array.isArray(path)){
    return { fontWeight:path.indexOf(history.location.pathname) >= 0?'bold':'normal'}
  }
	if(history.location.pathname === path){
		return { fontWeight:'bold'}
	}else {
		return {fontWeight:'normal'}
	}
  //return history.location.pathname === path;
}

const Menu = (props) => {
	const {history} = props;
	return (
		<Navbar bg="primary" expand="lg" animation="false">
  			<Navbar.Brand as={Link} to="/">LOGIN DEMO</Navbar.Brand>
  			<Navbar.Toggle aria-controls="basic-navbar-nav" />
  			<Navbar.Collapse id="basic-navbar-nav" animation="false">
    			<Nav className="mr-auto">
     		 		  <Nav.Link style={isActive(history, "/")} as={Link} to="/">                  
                  Home
              </Nav.Link>      				     				      				      				
      				{!isAuthenticated() && 
      					<>
      					<Nav.Link style={isActive(history, "/signin")} as={Link} to="/signin">
                  <BoxArrowInLeft size={iconSize} className="mr-1" />
                  Log in
                </Nav.Link>
      					<Nav.Link style={isActive(history, "/signup")} as={Link} to="/signup">
                  <PersonPlus size={iconSize} className="mr-1" />
                  Register
                </Nav.Link>
      					</>
      				}
      				{isAuthenticated() && 
      					<Nav.Link style={isActive(history, "/signout")} as={Link} to="/"
      						onClick= {() => {
								    signout(() => {
									     history.push("/");
								    })
							     }}
                >
                  <BoxArrowInRight size={iconSize} className="mr-1" />
							     Log Out
						    </Nav.Link>
      				}      				
    			</Nav>    			
  			</Navbar.Collapse>
		</Navbar>		
	)
}

export default withRouter(Menu);
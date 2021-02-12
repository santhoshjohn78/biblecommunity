import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Search from './Search';

class Header extends React.Component{
    constructor(props){
      super(props);
      
     
    }
    
    render(){
     const headerstyle = { border: '0px solid grey'}   
     return ( 
     <Container fluid>
       
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"><h2 className="">
        {this.props.name}
      </h2></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
          {this.props.children}
         
          </Nav.Link>
          
        </Nav>
        <Search></Search>
      </Navbar>
      
       
    
    </Container>
     )}
}

export default Header;

import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Search from './Search';
import Themes from './Themes';
import BookMark from './BookMark';
import {useSelector} from 'react-redux';


function Header(props){
    
     const headerstyle = { border: '0px solid grey'}   
     const isLogged = useSelector(state=>state.isLogged);
     return ( 
       
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"><h2 className="">
        {props.name}
      </h2></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
          {props.children}
         
          </Nav.Link>
          
        </Nav>
        <Themes></Themes>
        <BookMark></BookMark>
        <Search></Search>
        {isLogged? <Button>logout</Button>: <Button variant="outline-info">Login</Button>}
      </Navbar>
      
       
     )

}

export default Header;

import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Search from './Search';
import Themes from './Themes';
import BookMark from './BookMark';
import AuthComponent from './menu-components/AuthComponent';
import { useSelector, useDispatch } from 'react-redux';
import "./App.scss";
import mylogo from './mediaScriptureLogo.png';
import { saveJwtAction, loggedInAction } from './actions';


function Header(props) {

  const headerstyle = { border: '0px solid grey' }
  const isLogged = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(saveJwtAction(accessToken));
      dispatch(loggedInAction(true))
    }
  }, []);

  return (

    <Navbar bg="dark" variant="dark">
      <img src={mylogo} alt="Media Scripture Logo" />
      <Navbar.Brand href="#home"><h2 className="">
        {props.name}
      </h2></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          {props.children}

        </Nav.Link>

      </Nav>
      <Themes></Themes>
      {isLogged ?
        (<BookMark></BookMark>) : null
      }
      <Search></Search>
      <AuthComponent></AuthComponent>
    </Navbar>


  )

}

export default Header;

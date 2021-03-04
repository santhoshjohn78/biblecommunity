import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from './Config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ReactPlayer from 'react-player';
import './Media.scss';

import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";


class Media extends React.Component{
    constructor(props){
      super(props);
      this.config = new Config();
      
      
    }

    

    render(){
     
     return ( 
       <div>
        <div className='player-wrapper'>
          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'  width='100%'
            height='100%' className='react-player'>

          </ReactPlayer>
          
          
        </div>
        <div>
            <span><GoThumbsup></GoThumbsup>     200000</span>
            <span><GoThumbsdown></GoThumbsdown>     839</span>
          </div>
      </div>
     )}
}

export default Media;

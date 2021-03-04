import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from './Config';

import { BsBookmarkPlus } from "react-icons/bs";


class BookMark extends React.Component{
    constructor(props){
      super(props);
      this.config = new Config();
      this.state = {selectedFont:null, lgShow:false};
      
    }

    
    
    handleOnclick = () => {
      this.setState({lgShow:true})
      
      
    }

    render(){
      const styles = {
        iconStyle: {
            paddingRight:"50%",
            paddingTop:"5px",
            fontSize:"50px",
            color:"#fff"
        }
    }
    
     return ( 
       <div>
         <span onClick={this.handleOnclick}><h4  ><BsBookmarkPlus style={styles.iconStyle} ></BsBookmarkPlus></h4></span>
        

       
      </div>
     )}
}

export default BookMark;

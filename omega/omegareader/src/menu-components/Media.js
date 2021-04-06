import React, {useState,useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from '../Config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ReactPlayer from 'react-player';
import './Media.scss';

import {useSelector,useDispatch} from 'react-redux';
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";

function Media(props){
  const config = new Config();

  const bookid = useSelector(state=>state.page.bookId);
  
  const chapterNumber = useSelector(state=>state.page.currentPageNo);

  const url = config.MEDIASEARCH_URL;
  const [mediaList,setMediaList] = useState([]);

  const getSearchMediaRequestOption = {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
  }

  useEffect(() =>{
    fetch(url+"/"+bookid+"/"+chapterNumber,getSearchMediaRequestOption).then(res => res.json())
      .then((data)=>{setMediaList(data);}); 
  },[bookid,chapterNumber]);

    
     
  return ( 
    <div>
      {
        mediaList.map((element,i) =>
          <div>
            <div className='player-wrapper'>
              <ReactPlayer url={element.mediaUrl}  width='100%' height='100%' className='react-player'>
              </ReactPlayer>
            </div>
            <div>
                <span><GoThumbsup></GoThumbsup>     200000</span>
                <span><GoThumbsdown></GoThumbsdown>     839</span>
            </div>
          </div>
          )
      }
  </div>
  )}


export default Media;

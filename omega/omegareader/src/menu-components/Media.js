import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from '../Config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ReactPlayer from 'react-player';
import Scrollbar from 'react-scrollbars-custom';
import Container from 'react-bootstrap/Container';
import './Media.scss';

import { useSelector, useDispatch } from 'react-redux';
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { ActionLink } from '../common';


function Media(props) {
  const config = new Config();

  const bookid = useSelector(state => state.page.bookId);

  const chapterNumber = useSelector(state => state.page.currentPageNo);

  const url = config.MEDIASEARCH_URL;
  const updateUrl = config.MEDIA_URL + config.DEFAULT_USER_ID;

  const [mediaList, setMediaList] = useState([]);

  const [liked, setLiked] = useState(0);

  const [disLiked, setDisLiked] = useState(0);


  const getSearchMediaRequestOption = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  const putLikeMediaRequestOption = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }

  const putDislikeMediaRequestOption = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }

  useEffect(() => {
    fetch(url + "/" + bookid + "/" + chapterNumber, getSearchMediaRequestOption).then(res => res.json())
      .then((data) => { setMediaList(data); });
  }, [bookid, chapterNumber, liked, disLiked]);

  const handleOnLike = (id) => {
    console.log("call to like video " + id);

    fetch(updateUrl + "/like/" + id + "/test", putLikeMediaRequestOption)
      .then(res => { console.log(res.status); setLiked(liked + 1); });

  }

  const handleOnDisLike = (id) => {
    console.log("call to dislike video " + id);

    fetch(updateUrl + "/dislike/" + id + "/test", putLikeMediaRequestOption)
      .then(res => { console.log(res.status); setDisLiked(disLiked + 1); });

  }

  return (

    <div>
      <Scrollbar style={{ height: 700 }}>
        {
          mediaList.map((element, i) =>
            <div>

              <div className='player-wrapper'>
                <ReactPlayer controls="true" url={element.mediaUrl} width='100%' height='100%' className='react-player'>
                </ReactPlayer>
              </div>
              <div>
                <ActionLink><span className='thumb-icon' onClick={() => handleOnLike(element.id)}><GoThumbsup></GoThumbsup>     {element.likeCount}</span></ActionLink>
                <ActionLink><span className='thumb-icon' onClick={() => handleOnDisLike(element.id)}><GoThumbsdown></GoThumbsdown>     {element.dislike}</span></ActionLink>
                <span className='thumb-icon'>{element.bookName} {element.chapterNumber}: {element.verseNumber}</span>
              </div>

              <div><hr></hr></div>
            </div>
          )
        }
      </Scrollbar>
    </div >

  )
}


export default Media;

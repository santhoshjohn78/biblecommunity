import React, { useState, useEffect } from 'react';

import Config from './Config';
import { useSelector } from 'react-redux';
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";


function BookMark(props) {

  const config = new Config();
  const isLogged = useSelector(state => state.loggedIn);
  const jwt = useSelector(state => state.jwt);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [selectedFont, setSelectedFont] = useState(null);
  const pageurl = useSelector(state => state.page.pageurl);

  const styles = {
    iconStyle: {
      paddingRight: "50%",
      paddingTop: "5px",
      fontSize: "50px",
      color: "#fff"
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    body: JSON.stringify({
      userId: config.DEFAULT_USER_ID,
      bookId: useSelector(state => state.page.bookId),
      bookName: useSelector(state => state.page.bookName),
      pageUrl: pageurl,
      isLastVisitedPage: "false",
      chapterId: useSelector(state => state.page.currentPageNo),
      pageNumber: useSelector(state => state.page.currentPageNo)
    })
  }

  const checkBookmarkRequestOption = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
  }

  useEffect(() => {
    if (isLogged) {

      fetch(config.BOOKMARK_URL + config.DEFAULT_USER_ID + "/page/" + pageurl, checkBookmarkRequestOption)
        .then((response) => {
          if (response.status === 200)
            setIsBookMarked(true);
          else
            setIsBookMarked(false);
        });
    }

  }, [pageurl]);

  const handleOnclick = () => {

    if (isBookMarked == false)
      setIsBookMarked(true);
    else
      setIsBookMarked(false);

    fetch(config.BOOKMARK_URL + config.DEFAULT_USER_ID, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => { console.log("call to add bookmark:" + data); });
  }


  return (
    <div>
      <a href="#">
        <span onClick={handleOnclick}>
          <h4>
            {!isBookMarked && <BsBookmarkPlus style={styles.iconStyle} ></BsBookmarkPlus>}
            {isBookMarked && <BsBookmarkFill style={styles.iconStyle} ></BsBookmarkFill>}
          </h4>
        </span>
      </a>
    </div>
  );
}

export default BookMark;

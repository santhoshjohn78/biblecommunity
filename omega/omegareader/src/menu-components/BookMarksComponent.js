import React, { useState, useEffect } from 'react';

import Config from '../Config';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillTrashFill } from "react-icons/bs";
import styled from 'styled-components';

import { gotoPageAction } from '../actions';
function BookMarksComponent(props) {

  const config = new Config();
  const isLogged = useSelector(state => state.loggedIn);
  const fontFamilyValue = useSelector(state => state.fontFamily);
  const [bookMarksList, setBookMarksList] = useState([]);
  const url = config.BOOKMARK_URL + config.DEFAULT_USER_ID;
  const jwt = useSelector(state => state.jwt);
  const dispatch = useDispatch();
  const bibleVersion = useSelector(state => state.version);
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: config.DEFAULT_USER_ID,
      bookId: useSelector(state => state.page.bookId),
      bookName: useSelector(state => state.page.bookName),
      // pageUrl: pageurl,
      chapterId: useSelector(state => state.page.currentPageNo),
      pageNumber: useSelector(state => state.page.currentPageNo)
    })
  }


  const checkBookmarkRequestOption = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
  }
  const deleteBookmarkRequestOption = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
  }
  useEffect(() => {
    console.log("list bookmarks....");
    if (isLogged) {
      fetch(url, checkBookmarkRequestOption).then(res => res.json())
        .then((data) => { setBookMarksList(data); });
    }


  }, [bookMarksList]);

  const handleOnDeleteClick = (bookId) => {
    console.log("Delete bookmark " + bookId);

    fetch(url + "/" + bookId, deleteBookmarkRequestOption)
      .then(res => console.log(res.status));

    fetch(url, checkBookmarkRequestOption).then(res => res.json())
      .then((data) => { setBookMarksList(data); console.log(data); });

  }

  const handleGotoPage = (bookId, bookName, pageurl, chapterid, nofChapters) => {

    fetch(config.BASE_PAGE_URL + bibleVersion + "/page/" + pageurl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data.body;
      })
      .then((data) => {
        dispatch(gotoPageAction(pageurl, bookId, bookName, chapterid, data, data.paragraphs, -1, {}, chapterid));
      });

  }

  return (
    <Container fluid="true">
      {
        bookMarksList.map((element, i) =>
          <div key={i} style={{ paddingLeft: 50 }}>
            <Card>

              <Card.Body>
                <Card.Title>
                  <span onClick={() => handleOnDeleteClick(element.id)}>
                    <BsFillTrashFill></BsFillTrashFill>
                  </span>
                </Card.Title>
                <span onClick={() => handleGotoPage(element.bookId, element.bookName, element.pageUrl, element.pageNumber, element.chapterId)}>
                  <blockquote className="blockquote mb-0">
                    <h5>{element.bookName} {element.chapterId}</h5>
                    <footer className="blockquote-footer">
                      {element.formatedBookMarkedDate}
                    </footer>
                  </blockquote>
                </span>
              </Card.Body>
            </Card>

          </div>
        )
      }

    </Container>
  );
}

export default BookMarksComponent;

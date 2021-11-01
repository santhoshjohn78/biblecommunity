import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from './Config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { gotoPageAction } from './actions';
import styled from 'styled-components';
function Search(props) {
  const config = new Config();
  const [searchText, setSearchText] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const jwt = useSelector(state => state.jwt);
  const [searchResultsTotal, setSearchResultsTotal] = useState(0);
  const [searchHits, setSearchHits] = useState([]);
  const dispatch = useDispatch();
  const bibleVersion = useSelector(state => state.version);
  const getRequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${jwt}` }

  }

  const handleChange = (event) => {
    console.log(event.target.name + "=" + event.target.value);
    setSearchText(event.target.value);
  }

  const handleSubmit = (event) => {

    fetch(config.SEARCH_URL + searchText).then((response) => { return response.json() }).then((data) => {
      return data.hits;
    })
      .then((data) => {
        setSearchResultsTotal(data.totalHits.value);
        return data.hits;
      })
      .then((data) => {
        setSearchHits(data);
        setLgShow(true);
      });


    event.preventDefault();
  }

  const handleSearchRespClick = (pageurl, bookName, bookId, chapterName, verseNumber) => {
    console.log(bookName + chapterName + verseNumber);
    fetch(config.BASE_PAGE_URL + bibleVersion + "/page/" + pageurl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        return data.body;
      })
      .then((data) => {

        dispatch(gotoPageAction(pageurl, bookId, bookName,
          chapterName, data, data.paragraphs, 50, chapterName));
        setLgShow(false);
      });


  }
  const styles = {
    iconStyle: {
      paddingRight: "50%",
      paddingTop: "5px",
      fontSize: "50px",
      color: "#fff"
    }
  }
  return (
    <div>
      <Form inline>
        <FormControl type="text" placeholder="Search Bible"
          value={searchText} name="searchText" onChange={handleChange} className="mr-sm-2" >
        </FormControl>
        <a href="#"><span onClick={handleSubmit}><h4  > <BsSearch style={styles.iconStyle} ></BsSearch></h4></span></a>

        {/* <Button onClick={handleSubmit} variant="outline-info">Search</Button> */}
      </Form>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {searchText}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            searchHits.map((element, i) =>
              <div key={i} onClick={() => handleSearchRespClick(element.sourceAsMap.pageUrl, element.sourceAsMap.bookName,
                element.sourceAsMap.bookId, element.sourceAsMap.chapterNumber, element.sourceAsMap.verseNumber)}>
                <span><b>
                  {element.sourceAsMap.bookName} {element.sourceAsMap.chapterNumber}:{element.sourceAsMap.verseNumber}</b>
                </span>
                <p>
                  {element.sourceAsMap.verseText}
                </p>
              </div>
            )}
          {/* <h3>Total: {searchResultsTotal}</h3> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Search;

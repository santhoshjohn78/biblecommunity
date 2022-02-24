import React, { useState, useRef, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import Config from './Config';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { CirclePicker } from 'react-color';


import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';

import { gotoPageAction } from './actions';


function MainBody(props) {



  const config = new Config();

  const annotationUrl = config.ANNOTATION_URL + config.DEFAULT_USER_ID;

  const lastPageAPIUrl = config.LAST_PAGE_URL + config.DEFAULT_USER_ID + "/pagevisit";

  const bookid = useSelector(state => state.page.bookId);
  const bookName = useSelector(state => state.page.bookName);
  const pageurl = useSelector(state => state.page.pageurl);
  const pageContent = useSelector(state => state.page.pageContent);
  const paragraphs = useSelector(state => state.page.paragraphs);
  const sliderValue = useSelector(state => state.page.currentPageNo);
  const minValue = 1;
  const maxValue = useSelector(state => state.page.nofChapters);
  const [selectedversenum, setSelectedversenum] = useState(null);
  const [selectedverse, setSelectedverse] = useState(null);
  const [bgColor, setBgColor] = useState("#fff");
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const paragraphFontSize = useSelector(state => state.fontSize);
  const fontFamilyValue = useSelector(state => state.fontFamily);
  const themeBgColor = useSelector(state => state.theme.bgColor);
  const themeFontColor = useSelector(state => state.theme.fontColor);
  const bibleVersion = useSelector(state => state.version);
  const isLogged = useSelector(state => state.loggedIn);
  const HighlightBackground = styled.p`background-color:${bgColor}`;
  const BackgroundTheme = styled.div`background-color:${themeBgColor};`;
  const Paragraph = styled.p`font-size: ${paragraphFontSize}px;font-family: ${fontFamilyValue}; background-color:${themeBgColor}; color:${themeFontColor}`;
  const Heading2 = styled.h2`font-size: ${paragraphFontSize}px;font-family: ${fontFamilyValue}; background-color:${themeBgColor}; color:${themeFontColor}`;
  const VerseLink = styled.a`cursor: pointer; font-size: ${paragraphFontSize}px;font-family: ${fontFamilyValue}; color:${themeFontColor}`;
  const VerseNumberLink = styled.a`font-size: ${paragraphFontSize}px;font-family: ${fontFamilyValue}; color:${themeFontColor}; font-weight: bold;`;

  const [annotationComment, setAnnotationComment] = useState("");
  const [annotationTags, setAnnotationTags] = useState("");
  const [annotationMediaUrl, setAnnotationMediaUrl] = useState("");
  const [annotationSharedFlag, setAnnotationSharedFlag] = useState(true);
  const jwt = useSelector(state => state.jwt);
  const initColors = ['#B0BC00', '#FCB900', '#7BDCB5', '#F78DA7', '#2CCCE4'];

  const verseRefs = useRef();
  verseRefs.current = [];


  const getRequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${jwt}` },

  }

  const addtoverseRefs = (el) => {

    if (el && !verseRefs.current.includes(el)) {
      verseRefs.current.push(el);

    }

  }

  useEffect(() => {


    setSelectedversenum(1);
    const version = bibleVersion;
    if (isLogged) {
      const url = lastPageAPIUrl;

      fetch(url, getRequestOptions)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let visitpage = config.DEFAULT_PAGE_URL;
          if (data.pageUrl !== null) {
            visitpage = data.pageUrl;
          }
          const pagecontenturl = config.BASE_PAGE_URL + version + "/page/" + visitpage;
          fetch(pagecontenturl)
            .then((response) => {
              return response.json()
            })
            .then((data) => {
              return data.body;
            })
            .then((data) => {
              fetch(annotationUrl + "/book/" + bookid + "/chapter/" + 1, getRequestOptions)
                .then((response) => {
                  return response.json();
                })
                .then((data1) => {
                  console.log(data.paragraphs);
                  var colorMap = new Map();
                  for (let k = 0; k < data1.length; k++) {
                    colorMap.set("" + data1[k].verseNumber, data1[k].highlightColor);
                  }
                  for (let i = 0; i < data.paragraphs.length; i++) {
                    for (let j = 0; j < data.paragraphs[i].spans.length; j++) {
                      data.paragraphs[i].spans[j].annotationColor = colorMap.get("" + data.paragraphs[i].spans[j].value);
                    }
                  }

                  dispatch(gotoPageAction(data.pageUrl, bookid, bookName, 1, data, data.paragraphs, 50, {}, 1));

                  //  dispatch(gotoPageAction(pageurl,bookId,bookName,chapterid,data,data.paragraphs,-1,{},chapterid));
                });
            })

        });
    } else {
      const pagecontenturl = config.BASE_PAGE_URL + version + "/page/" + config.DEFAULT_PAGE_URL;
      fetch(pagecontenturl)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          return data.body;
        })
        .then((data) => {
          dispatch(gotoPageAction(config.DEFAULT_PAGE_URL, bookid, bookName, 1, data, data.paragraphs, 50, {}, 1));

        });
    }

  }, [bibleVersion]);

  const fetchPageContent = (pageurl, currentChapterNo) => {

    fetch(config.BASE_PAGE_URL + bibleVersion + "/page/" + pageurl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        return data.body;
      })
      .then((data) => {
        fetch(annotationUrl + "/book/" + bookid + "/chapter/" + currentChapterNo, getRequestOptions)
          .then((response) => {
            return response.json()
          })
          .then((data1) => {

            var colorMap = new Map();
            for (let k = 0; k < data1.length; k++) {
              colorMap.set("" + data1[k].verseNumber, data1[k].highlightColor);
            }
            for (let i = 0; i < data.paragraphs.length; i++) {
              for (let j = 0; j < data.paragraphs[i].spans.length; j++) {
                data.paragraphs[i].spans[j].annotationColor = colorMap.get("" + data.paragraphs[i].spans[j].value);
              }
            }

            dispatch(gotoPageAction(pageurl, bookid, bookName,
              currentChapterNo, data, data.paragraphs, -1, {}, currentChapterNo));

          });



      });

  }

  const handleOnVerseClick = (verseId, verseName) => {
    if (isLogged) {
      setSelectedversenum(verseId);
      setSelectedverse(verseName);
      setShowPopup(true);
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    body: JSON.stringify({
      userId: config.DEFAULT_USER_ID,
      bookId: useSelector(state => state.page.bookId),
      bookName: useSelector(state => state.page.bookName),
      pageUrl: useSelector(state => state.page.pageurl),
      chapterId: useSelector(state => state.page.currentPageNo),
      pageNumber: useSelector(state => state.page.currentPageNo),
      verseNumber: selectedversenum,
      verseText: selectedverse,
      commentText: annotationComment,
      highlightColor: bgColor,
      sharedAnnotation: annotationSharedFlag,
      tags: [annotationTags],
      mediaUrls: [annotationMediaUrl]
    })
  }

  const handleSaveAnnotation = () => {

    fetch(config.ANNOTATION_URL + config.DEFAULT_USER_ID, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => { console.log("call to add annotation:" + data); });

    setShowPopup(false);
  }

  const handleSliderChange = (e) => {
    const chapid = e.target.value;

    fetch(config.QUERY_PAGE_URL + bookid + "/chapter/" + e.target.value)
      .then((response) => { return response.json() })
      .then((data) => { fetchPageContent(data.url, chapid); });
  }

  const handleChangeColor = (color) => {

    setBgColor(color.hex);
    verseRefs.current[selectedversenum - 1].style.background = color.hex;
    //TODO this should be removed and replaced by API call.
    for (let i = 0; i < paragraphs.length; i++) {
      for (let j = 0; j < paragraphs[i].spans.length; j++) {
        if (paragraphs[i].spans[j].value === selectedversenum) {
          paragraphs[i].spans[j].annotationColor = color.hex;
          break;
        }
      }
    }

    dispatch(gotoPageAction(-1, -1, -1, -1, -1, paragraphs, -1, -1, -1));
  }


  return (<div>
    <Modal
      size="lg"
      show={showPopup}
      onHide={() => setShowPopup(false)} centered
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {bookName} {sliderValue}:{selectedversenum}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <HighlightBackground>
                {selectedverse}
              </HighlightBackground>

            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formgrp.comments">
                <Form.Label>Comment on this verse</Form.Label>
                <Form.Control as="textarea" value={annotationComment} onChange={e => setAnnotationComment(e.target.value)}
                  type="textarea" rows={5} />
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formgrp.colorpicker">
                <Form.Label>Pick a highlight color for this verse</Form.Label>

                <CirclePicker colors={initColors} color={bgColor} onChangeComplete={handleChangeColor}></CirclePicker>
              </Form.Group>
            </Col>

            <Col>
              <label htmlFor="basic-url">Media</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    URL
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control id="basic-url" value={annotationMediaUrl} onChange={e => setAnnotationMediaUrl(e.target.value)} aria-describedby="basic-addon3" placeholder="of audio,video,or image about this verse." />
                <Form.Text id="tagHelpBlock" muted>
                  Paste the URL of a sermon video (Vimeo, YouTube etc) and we would embed it for other readers if your media is appropriate for this verse.
                </Form.Text>

              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formgrp.comments">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" value={annotationTags} onChange={e => setAnnotationTags(e.target.value)} aria-describedby="tagHelpBlock" />
                <Form.Text id="tagHelpBlock" muted>
                  You can use comma ',' to add multiple tags. E.g. #Prayer,#Hope etc
                </Form.Text>
              </Form.Group>

            </Col>
            <Col>
              <Form.Group id="formGridCheckbox">
                <Form.Label>Sharing</Form.Label>
                <Form.Check type="checkbox" checked={annotationSharedFlag}
                  onChange={e => setAnnotationSharedFlag(e.target.value)} label="I want to share this comment and sermon with others." />
              </Form.Group>
            </Col>
          </Row>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPopup(false)}>Close</Button>
        <Button variant="primary" onClick={() => handleSaveAnnotation()}>Save changes</Button>
      </Modal.Footer>
    </Modal>
    <BackgroundTheme>


      <Scrollbar style={{ height: 700 }}>
        <Heading2><h2>{pageContent.h2}</h2> </Heading2>

        {

          paragraphs.map((element, i) =>
            <div key={i}>

              <Paragraph>
                <p>
                  {
                    element.spans.map(spanelements =>


                      <span onClick={() => { handleOnVerseClick(spanelements.value, spanelements.verseText); }} key={spanelements.value}
                        ref={addtoverseRefs}
                        style={{ backgroundColor: spanelements.annotationColor }}>
                        <VerseNumberLink>
                          {spanelements.value}
                        </VerseNumberLink>
                        <VerseLink href="#">
                          {spanelements.verseText}
                        </VerseLink>
                      </span>


                    )}
                </p>
              </Paragraph>


            </div>)


        }
        {/* <RangeSlider
          value={sliderValue} min={minValue} max={maxValue}
          onChange={handleSliderChange}
        /> */}
      </Scrollbar>


    </BackgroundTheme>
  </div>);


}

export default MainBody;

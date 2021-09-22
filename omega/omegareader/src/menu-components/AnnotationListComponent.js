import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Config from '../Config';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillTrashFill, BsTag, BsTagFill } from "react-icons/bs";
import { FcVideoFile } from "react-icons/fc";
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import { gotoPageAction } from '../actions';
function AnnotationListComponent(props) {

  const config = new Config();
  const fontFamilyValue = useSelector(state => state.fontFamily);
  const [bgColor, setBgColor] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [playMedia, setPlayMedia] = useState();
  const VerseParagraph = styled.p`font-size: 14px;font-family: ${fontFamilyValue}; background-color:${bgColor};`;
  const Paragraph = styled.p`font-size: 12px;font-family: ${fontFamilyValue}; background-color:${bgColor};`;
  const bibleVersion = useSelector(state => state.version);
  const [annotationList, setAnnotationList] = useState([]);
  const url = config.ANNOTATION_URL + config.DEFAULT_USER_ID;
  const dispatch = useDispatch();

  const styles = {
    iconStyle: {
      paddingRight: "50%",
      paddingTop: "5px",
      fontSize: "50px",
      color: "#fff"
    }
  }

  const getAnnotationRequestOption = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  const deleteAnnotationRequestOption = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }

  useEffect(() => {
    fetch(url, getAnnotationRequestOption).then(res => res.json())
      .then((data) => { setAnnotationList(data); console.log(data); });
  }, []);

  const handleOnDeleteClick = (annotationId) => {
    console.log("Delete Annotation " + annotationId);

    fetch(url + "/" + annotationId, deleteAnnotationRequestOption)
      .then(res => console.log(res.status));

    fetch(url, getAnnotationRequestOption).then(res => res.json())
      .then((data) => { setAnnotationList(data); console.log(data); });

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

  const handlePlayMedia = (mediaUrl) => {
    console.log(mediaUrl);
    setPlayMedia(mediaUrl);
    setLgShow(true);
  }

  return (
    <Container fluid="true">
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ReactPlayer url={playMedia}>

            </ReactPlayer>


          </div>
        </Modal.Body>
      </Modal>
      {
        annotationList.map((element, i) =>
          <div key={i} style={{ paddingLeft: 50 }}>
            <Card>

              <Card.Body>
                <Card.Title>
                  <span onClick={() => handleGotoPage(element.bookId, element.bookName, element.pageUrl, element.pageNumber, element.chapterId)} style={{ float: 'left' }}>{element.bookName} {element.chapterId}
                  </span>

                  <span style={{ float: 'right' }} onClick={() => handleOnDeleteClick(element.id)}>
                    <BsFillTrashFill></BsFillTrashFill>
                  </span>
                </Card.Title>
                <span>
                  <blockquote style={{ float: 'left' }} className="blockquote mb-0">

                    <VerseParagraph>
                      <p style={{ backgroundColor: element.highlightColor }}>
                        {element.verseNumber}  {element.verseText}
                      </p>
                    </VerseParagraph>
                    <Paragraph>
                      <p>
                        {element.commentText}
                      </p>
                    </Paragraph>
                    {element.mediaUrls.map((mediaelem) =>
                      <span onClick={() => handlePlayMedia(mediaelem)}>
                        <FcVideoFile></FcVideoFile>
                      </span>
                    )}

                    <footer className="blockquote-footer">
                      {element.tags.map((tagelem) =>
                        <span style={{ fontSize: '12px', float: 'left' }} ><BsTagFill></BsTagFill> <span>{tagelem} </span></span>
                      )}
                      <span style={{ fontSize: '12px', float: 'right' }}>{element.formattedAnnotationDate}</span>
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

export default AnnotationListComponent;

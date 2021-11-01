import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Config from '../Config';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillTrashFill, BsFillXCircleFill, BsTag, BsTagFill, BsX, BsXCircle } from "react-icons/bs";
import { FcVideoFile } from "react-icons/fc";
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { ActionLink } from '../common';
import { gotoPageAction } from '../actions';
function AnnotationListComponent(props) {

  const config = new Config();
  const annotationUrl = config.ANNOTATION_URL + config.DEFAULT_USER_ID;
  const jwt = useSelector(state => state.jwt);
  const isLogged = useSelector(state => state.loggedIn);
  const fontFamilyValue = useSelector(state => state.fontFamily);
  const [bgColor, setBgColor] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [deletedAnnotation, setDeletedAnnotation] = useState();
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
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
  }

  const deleteAnnotationRequestOption = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
  }

  useEffect(() => {
    if (isLogged) {
      fetch(url, getAnnotationRequestOption).then(res => res.json())
        .then((data) => { setAnnotationList(data); console.log(data); });
    }

  }, [deletedAnnotation]);

  const handleOnDeleteClick = (annotationId) => {
    console.log("Delete Annotation " + annotationId);

    fetch(url + "/" + annotationId, deleteAnnotationRequestOption)
      .then(res => console.log(res.status));

    fetch(url, getAnnotationRequestOption).then(res => res.json())
      .then((data) => { setAnnotationList(data); console.log(data); setDeletedAnnotation(annotationId); });

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
        fetch(annotationUrl + "/book/" + bookId + "/chapter/" + chapterid, getAnnotationRequestOption)
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

            dispatch(gotoPageAction(pageurl, bookId, bookName, chapterid, data, data.paragraphs, nofChapters, {}, chapterid));
          });

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
              <Card.Header>
                <Card.Title>
                  <ActionLink>
                    <span onClick={() => handleGotoPage(element.bookId, element.bookName, element.pageUrl, element.pageNumber, element.chapterId)} style={{ float: 'left' }}>{element.bookName} {element.chapterId}
                    </span>
                  </ActionLink>
                  <span style={{ float: 'right' }} onClick={() => handleOnDeleteClick(element.id)}>
                    <ActionLink>
                      <BsFillXCircleFill></BsFillXCircleFill>
                    </ActionLink>
                  </span>
                </Card.Title>
              </Card.Header>

              <Card.Body>

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

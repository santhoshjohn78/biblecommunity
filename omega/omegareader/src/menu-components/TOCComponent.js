import React, { useState, useEffect } from 'react';
import Config from '../Config';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import './TOCComponent.scss';

import { gotoPageAction } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

function TOCComponent(props) {

    const config = new Config();
    const url = config.VTOC_URL;
    const annotationUrl = config.ANNOTATION_URL + config.DEFAULT_USER_ID;
    const [toc, setToc] = useState([]);
    const [pageContent, setPageContent] = useState({});
    const [paragraphs, setParagraphs] = useState([]);
    const [bookName, setBookName] = useState("");
    const [bookid, setBookid] = useState("");
    const [maxValue, setMaxValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const dispatch = useDispatch();
    const bibleVersion = useSelector(state => state.version);

    const getToc = () => {
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }

    useEffect(() => {
        getToc().then((data) => {
            setToc(data.bookList);
            //this.setState({toc:data.bookList});
            //console.log(this.state.toc);

        });
    }, []);


    const getRequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

    }

    const handleGotoPage = (bookId, bookName, pageurl, chapterid, nofChapters) => {
        setPageContent(
            fetch(config.BASE_PAGE_URL + bibleVersion + "/page/" + pageurl)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setPageContent(data.body);
                    return data.body;
                })
                .then((data) => {
                    fetch(annotationUrl + "/book/" + bookId + "/chapter/" + chapterid, getRequestOptions)
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

                            setParagraphs(data.paragraphs);

                            setBookName(bookName);
                            setBookid(bookId);
                            setMaxValue(nofChapters);
                            setSliderValue(chapterid);
                            dispatch(gotoPageAction(pageurl, bookId, bookName, chapterid, data, data.paragraphs, nofChapters, {}, chapterid));
                        });

                })
        );


    }

    return (
        <Container fluid="true">

            <div>


                <Accordion>
                    {
                        toc.map((element, i) =>

                            <div key={i}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} style={{ paddingLeft: 50 }} variant="warning" eventKey={element.playOrder}>
                                            <h5>{element.title}</h5>

                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={element.playOrder}>
                                        <Card.Body style={{ paddingLeft: 50 }}><h4>
                                            {
                                                element.sectionList.map(chapterelements =>


                                                    <Badge key={chapterelements.title} variant="secondary">
                                                        <span key={chapterelements.title} onClick={() => handleGotoPage(element.id, element.title,
                                                            chapterelements.url, chapterelements.title, chapterelements.sectionTotal)}>
                                                            {chapterelements.title}
                                                        </span>
                                                    </Badge>

                                                )}</h4>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>


                            </div>)
                    }

                </Accordion>



            </div>
        </Container>
    );



}

export default TOCComponent;
import React, {useState,userRef,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Config from './Config';
import ToolBarComponent from './ToolBarComponent';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Card from 'react-bootstrap/Card';
import Media from './Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {CirclePicker} from 'react-color';

import {useSelector,useDispatch} from 'react-redux';
import Scrollbar from 'react-scrollbars-custom';
import setPageReducer from './reducers/setPage';
import setFontSizeReducer from './reducers/setFontSize';
import styled from 'styled-components';
import { gotoPageAction } from './actions'; 

//class MainBody extends React.Component{
function MainBody(props){
    
    //constructor(props){
        
    const config = new Config();
    const bookid = useSelector(state=>state.page.bookId);
    const bookName = useSelector(state=>state.page.bookName);
    const pageurl = useSelector(state=>state.page.pageurl);
    const pageContent = useSelector(state=>state.page.pageContent);
    //const [pageContent,setPageContent] =  useState({});
    
    //setPageContent(useSelector(state=>state.page.pageContent));
    //const [paragraphs, setParagraphs] = useState([]);
    //setParagraphs(useSelector(state=>state.page.paragraphs));
    const paragraphs = useSelector(state=>state.page.paragraphs);
    const sliderValue = useSelector(state=>state.page.currentPageNo);
    const minValue = 1;
    const maxValue = useSelector(state=>state.page.nofChapters);
    const [selectedversenum,setSelectedversenum] = useState(null);
    const [selectedverse,setSelectedverse] = useState(null);
    const [bgColor,setBgColor] = useState("#fff");
    const dispatch = useDispatch();
    const paragraphFontSize = useSelector(state=>state.fontSize);
    const fontFamilyValue = useSelector(state=>state.fontFamily);
    
    const verseRefs = React.createRef([]);
    verseRefs.current = [];
        
    
    const addtoverseRefs = (el) =>{
        if (el && !verseRefs.current.includes(el)){
            verseRefs.current.push(el);
        }
        //console.log(el);
    }

    useEffect(() =>{
        console.log("inside use");
        setSelectedversenum(1);
        
        fetch(config.SAMPLE_PAGE_URL)
                        .then((response) => { 
                            return response.json()
                        })
                        .then((data)=>{
                            return data.body;
                        })
                            .then((data) => { 
                                dispatch(gotoPageAction(config.SAMPLE_PAGE_URL,bookid,bookName,1,data,data.paragraphs,50,1));
                                
                            }) ;
  
    
   },[]);
  
   const fetchPageContent = (pageurl,currentChapterNo) => {
        
            fetch(config.BASE_PAGE_URL+pageurl)
                         .then((response) => { 
                             return response.json()
                            })
                           .then((data)=>{

                                return data.body;
                            })
                              .then((data) => { 
                                 
                                  dispatch(gotoPageAction(config.BASE_PAGE_URL+pageurl,bookid,bookName,
                                    currentChapterNo,data,data.paragraphs,-1,currentChapterNo));
                                }) ;

      
    }
  
    const handleOnVerseClick = (verseId,verseName) => {
        setSelectedversenum(verseId);
        setSelectedverse(verseName);
       
    }
  
    const handleSliderChange = (e) => {
        //sliderValue = e.target.value;
        console.log("-----------------"+e.target.value);
        const chapid = e.target.value;
       
        fetch(config.QUERY_PAGE_URL+bookid+"/chapter/"+e.target.value)
            .then((response)=>{console.log(response); return response.json()})
            .then((data)=>{console.log(data.url); console.log(chapid+"+++++"+e.target.value); fetchPageContent(data.url, chapid);});
    }

    const handleChangeColor = (color) => {
       
        setBgColor(color.hex );
        
    }
    
    
    const parastyle = 33;
        
    const Paragraph = styled.p`
    font-size: ${paragraphFontSize}px;
    font-family: ${fontFamilyValue}
`;

      const popover = 
             (<Popover id="popover-basic">
              <Popover.Title as="h3">{bookName} {sliderValue}:{selectedversenum}</Popover.Title>
              <Popover.Content>
                <textarea placeholder="Comment on this verse." rows={5}
                    cols={35}></textarea>
                <hr></hr>
                <CirclePicker onChangeComplete={handleChangeColor}></CirclePicker>
                {/* <CirclePicker color={this.state.background} onChangeComplete={handleChangeColor}></CirclePicker> */}
              </Popover.Content>
            </Popover>
          );
        
      return (<div>
            
      <Container  fluid="true">
         
        <Row>
        
          <Col sm={2}>
            <ToolBarComponent></ToolBarComponent>
           </Col>
          
           
          <Col sm={7}>
          <Scrollbar style={{ height: 700 }}>
             <h2>{pageContent.h2}</h2> 
             
          {
            
            paragraphs.map( (element,i) =>
              <div key={i}>
                  
                  <Paragraph>
                  <p>
                    {
                     element.spans.map(spanelements =>
                     <OverlayTrigger  key={spanelements.value} trigger="click" rootClose="True" placement="auto" overlay={popover}>
                      <span key={spanelements.value} ref={addtoverseRefs} onClick={() => handleOnVerseClick(spanelements.value,
                        spanelements.verseText)} >
                        {spanelements.value} 
                        {spanelements.verseText}
                      </span>
                       </OverlayTrigger>
                     )}
                  </p>
                  </Paragraph>
                  
                  
              </div>)
              
              
          }
          <RangeSlider
            value={sliderValue} min={minValue} max={maxValue}
            onChange={handleSliderChange}
            />
            </Scrollbar>
          </Col>
          
          <Col sm={3}>
                <Scrollbar style={{ height: 700 }}>
                <Media></Media>
                <Media></Media>
                <Media></Media>
                </Scrollbar>
           </Col>
      </Row>
      </Container>
      </div>);
   
    
  }

  export default MainBody;

import React, {useState,userRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Config from './Config';
import TOCComponent from './TOCComponent';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Card from 'react-bootstrap/Card';

class MainBody extends React.Component{

    constructor(props){
        super(props);
        this.config = new Config();
        this.state = {
            bookid:"navPoint1",pageContent:{}, paragraphs:[],sliderValue:1,minValue:1,maxValue:50
        };
  
    }
    
    componentDidMount(){
      fetch(this.config.SAMPLE_PAGE_URL).then((response) => { return response.json()}).then((data)=>{
        this.setState({pageContent:data.body}); return data.body;})
        .then((data) => {this.setState({paragraphs:data.paragraphs});}).then(()=>console.log(this.state.pageContent));
  
          console.log(this.state.pageContent);
    
   }
  
    fetchPageContent = (pageurl) => {
        this.setState({pageContent:fetch(this.config.BASE_PAGE_URL+pageurl).then((response) => { return response.json()}).then((data)=>{
  
            this.setState({pageContent:data.body}); return data.body;}).then((data) => {this.setState({paragraphs:data.paragraphs})}) });

    }
  
    handleOnChapClick = (bookId,pageurl,chapterid,nofChapters) => {
  
        this.fetchPageContent(pageurl);
        this.setState({bookid:bookId});
        this.setState({maxValue:nofChapters});
        this.setState({sliderValue:chapterid});
    }
  
    handleSliderChange = (e) => {
        this.setState({sliderValue:e.target.value});

        fetch(this.config.QUERY_PAGE_URL+this.state.bookid+"/chapter/"+e.target.value)
            .then((response)=>{console.log(response); return response.json()})
            .then((data)=>{console.log(data.url);this.fetchPageContent(data.url);});

        //console.log("pageurl got from api::"+pageUrl);
        //this.fetchPageContent(pageUrl);
    }
    
  
    render(){

        
        
      return <Container fluid="true">
         
        <Row>
          <Col sm={2}>
            {this.props.state.showTOC &&  <TOCComponent onclickhandler={this.handleOnChapClick}></TOCComponent>}
           </Col>
           
          <Col sm={8}>
          
            { <h2>{this.state.pageContent.h2}</h2> }
          {
            
            this.state.paragraphs.map(element =>
              <div>
                  <p>
                    {
                     element.spans.map(spanelements =>
                      
                      <span>
                        {spanelements.value} 
                        {spanelements.verseText}
                      </span>
                     )}
                  </p>
                  
                  
              </div>)
              
              
          }
          <RangeSlider
            value={this.state.sliderValue} min={this.state.minValue} max={this.state.maxValue}
            onChange={this.handleSliderChange}
            />
          </Col>
          
          <Col sm={2}>
            
           </Col>
      </Row>
      </Container>
    }
    
  }

  export default MainBody;

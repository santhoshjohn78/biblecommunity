import React, {useState,userRef} from 'react';
import{SplitButton,MenuItem} from'react-bootstrap';
import Container from 'react-bootstrap/Container';
import IframeResizer from 'iframe-resizer-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Header from './Header';
import Config from './Config';
import TOCComponent from './TOCComponent';
import ToolBarComponent from './ToolBarComponent';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {showTOC:false};
  }

  handleOnTOCClick = () => {
    this.setState({showTOC:!this.state.showTOC});
  }

  render() {
    return <div>
        <Header name="Conservative Bible Fellowship">
          <ToolBarComponent id="toc" name="Table Of Contents" icon="book icon" onclickhandler={this.handleOnTOCClick}>
          </ToolBarComponent>
        
          <ToolBarComponent id="bkmk" name="bookmark" icon="bookmark icon" onclickhandler={this.handleOnTOCClick}>

          </ToolBarComponent>
        </Header>
        <MainBody state={this.state} iframe='<iframe src="http://localhost:8080/asv/OEBPS/66.RE.22.xhtml"></iframe>'></MainBody>

        
    </div>  
  }
}

class MainBody extends React.Component{
  constructor(props){
    super(props);
    this.config = new Config();
    this.state = {showUrl:this.config.SAMPLE_PAGE_URL}
  }
  

  iframe() {
    return {
      __html: this.props.iframe
    }
  }
  handleOnChapClick = (pageurl) => {

    this.setState({showUrl:this.config.BASE_PAGE_URL+pageurl});
  
  }

  render(){
    return <Container fluid="true">
       
      <Row>
        <Col sm={1}>
          {this.props.state.showTOC &&  <TOCComponent onclickhandler={this.handleOnChapClick}></TOCComponent>}
         </Col>
        <Col sm={10}>
        <IframeResizer
           forwardRef={this.contentFrame}
           log
            src={this.state.showUrl}
           style={{ width: "0px", minWidth: "100%", height:"500px"}}
          />
        </Col>
        <Col sm={1}>
          <Button>Next</Button>
         </Col>
    </Row>
    </Container>
  }
  
}

const Footer = (props) => {
  const footerstyle = { border: '2px solid blue'};
  const [ isOpen, setIsOpen ] = useState (false);
  console.log(useState(true));
  const handleOnclick = () =>{
    setIsOpen(!isOpen);
  };

  return <div style={footerstyle}>
    <span onClick={handleOnclick}>
      <h5>{props.name}</h5>
    </span>
    
    <h3>{isOpen?props.children:null}</h3>
  </div>
}


export default App;

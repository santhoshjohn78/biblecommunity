import React, {useState,userRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Header from './Header';
import ToolBarComponent from './ToolBarComponent';
import MainBody from './MainBody';
import Scrollbar from 'react-scrollbars-custom';
import Media from './menu-components/Media';

class App extends React.Component{

  constructor(props){
    super(props);
    require('dotenv').config();
  }

  handleOnTOCClick = () => {
    this.setState({showTOC:!this.state.showTOC});
  }

  render() {
    return <div>
        <Header name="">
          {/* <ToolBarComponent id="toc" name="Table Of Contents" icon="book icon" onclickhandler={this.handleOnTOCClick}>
          </ToolBarComponent>
         */}
          {/* <ToolBarComponent id="bkmk" name="bookmark" icon="bookmark icon" onclickhandler={this.handleOnTOCClick}>

          </ToolBarComponent> */}
        </Header>
        <Container  fluid="true">
          <Row>
          <Col sm={2}>
            <ToolBarComponent></ToolBarComponent>
           </Col>
           <Col sm={7}>
           <MainBody state={this.state}></MainBody>
           </Col>
           <Col sm={3}>
                {/* <Scrollbar style={{ height: 700 }}> */}
                <Media></Media>
                {/* </Scrollbar> */}
           </Col>
          </Row>
        </Container>
        

        
    </div>  
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

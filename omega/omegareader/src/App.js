import React, {useState,userRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Header from './Header';
import ToolBarComponent from './ToolBarComponent';
import MainBody from './MainBody';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {showTOC:true};
  }

  handleOnTOCClick = () => {
    this.setState({showTOC:!this.state.showTOC});
  }

  render() {
    return <div>
        <Header name="The Book">
          <ToolBarComponent id="toc" name="Table Of Contents" icon="book icon" onclickhandler={this.handleOnTOCClick}>
          </ToolBarComponent>
        
          {/* <ToolBarComponent id="bkmk" name="bookmark" icon="bookmark icon" onclickhandler={this.handleOnTOCClick}>

          </ToolBarComponent> */}
        </Header>
        <MainBody state={this.state}></MainBody>

        
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

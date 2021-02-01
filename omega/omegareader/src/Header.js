import React, {useState} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Header extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
     const headerstyle = { border: '0px solid grey'}   
     return  <Container fluid>
       <Row>
       <Col sm={6}>
      <h2>
        {this.props.name}
      </h2>
      </Col>
      <Col sm={6}></Col>
      </Row>
      <Row>
      <Col sm={10}></Col>
      <Col sm={2}>
      
          {this.props.children}
      
      </Col>
      </Row>
    
    </Container>
    }
}

export default Header;

import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import Config from './Config';

import RangeSlider from 'react-bootstrap-range-slider';

import { BsFonts } from "react-icons/bs";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { changeFontSizeAction,changeFontFamilyAction } from './actions'; 
import {useSelector,useDispatch} from 'react-redux';

import styled from 'styled-components';

function Themes(props){
    
      const config = new Config();
      const [selectedFont, setSelectedFont] = useState(null);
      const [lgShow,setLgShow] = useState(false);
      const dispatch = useDispatch();
      const [radioValue, setRadioValue] = useState('1');
      const fontSliderValue = useSelector(state=>state.fontSize);
      
      const minValue = 10;
      const maxValue = 40;
    
    
    const handleOnclick = () => {
      setLgShow(true);
     
      
    }

    const handleSliderChange = (e) => {
      
      console.log("-------fontsize----------"+e.target.value);
      const fontsize = e.target.value;
     
      dispatch(changeFontSizeAction(fontsize));
  }

    
    const styles = {
        iconStyle: {
            paddingRight:"50%",
            paddingTop:"5px",
            fontSize:"50px",
            color:"#fff"
        }
    }

    const radios = [
      { name: 'Light', value: '1' },
      { name: 'Sepia', value: '2' },
      { name: 'Dark', value: '3' },
    ];
    
    const Papyrus = styled.p`font-family: Papyrus,Fantasy, Times, serif;`;
    const Helvetica = styled.p`font-family: Helvetica,Sans-serif, Times, serif;`;
    const CourierNew = styled.p`font-family: Courier New, Monospace, Times, serif;`;
    const Georgia = styled.p`font-family: Georgia,Serif, Times, serif;`;
    const LucidaConsole = styled.p`font-family: LucidaConsole,Monospace, Times, serif;`;
    

     return ( 
       <div>
         <span onClick={handleOnclick}><h4  ><BsFonts style={styles.iconStyle} ></BsFonts></h4></span>
        

        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Text
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container  fluid="true">
         
         <Row>
         
           <Col sm={12}>
         <h5>Font Size</h5>
         <RangeSlider
            value={fontSliderValue} min={minValue} max={maxValue}
            onChange={handleSliderChange}
            />
            </Col>
            </Row>
            <Row><Col sm={12}><hr></hr></Col></Row>
            <Row>

            <Col sm={6}>
            
          <h5>Color Mode</h5>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="outline-dark"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          
          </ButtonGroup>
          </Col>
          <Col sm={6}>
          <ListGroup>
           <h5>Font</h5>
           <ListGroup.Item eventKey="helvetica" onClick={(e)=>{dispatch(changeFontFamilyAction("Helvetica,Sans-serif, Times, serif;"));}} action variant="dark">
              <Helvetica>Helvetica</Helvetica>
            </ListGroup.Item>
           <ListGroup.Item eventKey="Courier" onClick={(e)=>{dispatch(changeFontFamilyAction("Courier New, Monospace, Times, serif;"));}}  action variant="light">
              <CourierNew>Courier New</CourierNew>
            </ListGroup.Item>
           <ListGroup.Item eventKey="Papyrus" onClick={(e)=>{dispatch(changeFontFamilyAction("Papyrus,Fantasy, Times, serif;"));}}  action variant="dark">
           <Papyrus>Papyrus</Papyrus>
            </ListGroup.Item>
           <ListGroup.Item eventKey="Georgia" onClick={(e)=>{dispatch(changeFontFamilyAction("Georgia,Serif, Times, serif;"));}}  action variant="light">
              <Georgia>Georgia</Georgia>
            </ListGroup.Item>
            <ListGroup.Item eventKey="Lucida" onClick={(e)=>{dispatch(changeFontFamilyAction("LucidaConsole,Monospace, Times, serif;"));}}  action variant="dark">
              <LucidaConsole>Lucida Console</LucidaConsole>
            </ListGroup.Item>
          </ListGroup>
          </Col>
          </Row>
          </Container>    
        </Modal.Body>
      </Modal>
      </div>
     );
}

export default Themes;

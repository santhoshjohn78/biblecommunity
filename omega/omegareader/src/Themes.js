import React, { useState } from 'react';

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
import { changeFontSizeAction, changeFontFamilyAction, changeThemeColorAction, changeVersionAction } from './actions';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

function Themes(props) {

  const config = new Config();
  //const [selectedFont, setSelectedFont] = useState(null);
  const selectedFont = useSelector(state => state.fontFamily);
  const bibleVersion = useSelector(state => state.version);
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState('1');
  const fontSliderValue = useSelector(state => state.fontSize);


  const minValue = 10;
  const maxValue = 40;


  const handleOnclick = () => {
    setLgShow(true);


  }

  const handleFontFamilyChange = (e) => {

    dispatch(changeFontFamilyAction(e));

  }

  const handleSliderChange = (e) => {


    const fontsize = e.target.value;

    dispatch(changeFontSizeAction(fontsize));
  }

  const handleThemeColorChange = (e) => {
    setRadioValue(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case "1": dispatch(changeThemeColorAction("white", "black"));
        break;
      case "2": dispatch(changeThemeColorAction("#FFE599", "#7C422F"));
        break;
      case "3": dispatch(changeThemeColorAction("#444444", "white"));
        break;
      default:
        dispatch(changeThemeColorAction("white", "black"));
    }

    console.log(e.currentTarget.value);
  }

  const styles = {
    iconStyle: {
      paddingRight: "50%",
      paddingTop: "5px",
      fontSize: "50px",
      color: "#fff"
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
      <a href="#"><span onClick={handleOnclick}><h4  ><BsFonts style={styles.iconStyle} ></BsFonts></h4></span></a>


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
          <Container fluid="true">

            <Row>

              <Col sm={6}>
                <h5>Font Size</h5>
                <RangeSlider
                  value={fontSliderValue} min={minValue} max={maxValue}
                  onChange={handleSliderChange}
                />
              </Col>
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
                      onChange={(e) => { handleThemeColorChange(e) }}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}

                </ButtonGroup>
              </Col>

            </Row>
            <Row><Col sm={12}><hr></hr></Col></Row>
            <Row>
              <Col sm={6}>
                <ListGroup>
                  <h5>Version</h5>
                  <ListGroup.Item active={bibleVersion == "asv"} eventKey="asv" onClick={(e) => { dispatch(changeVersionAction("asv")); }} action variant="dark">
                    American Standard Version
                  </ListGroup.Item>
                  <ListGroup.Item active={bibleVersion == "cpdv"} eventKey="cpdv" onClick={(e) => { dispatch(changeVersionAction("cpdv")); }} action variant="light">
                    Catholic Public Domain Version
                  </ListGroup.Item>
                  <ListGroup.Item active={bibleVersion == "darby"} eventKey="darby" onClick={(e) => { dispatch(changeVersionAction("darby")); }} action variant="dark">
                    Darby Translation John Nelson
                  </ListGroup.Item>
                  <ListGroup.Item active={bibleVersion == "kjv"} eventKey="kjv" onClick={(e) => { dispatch(changeVersionAction("kjv")); }} action variant="light">
                    King James Version
                  </ListGroup.Item>
                  <ListGroup.Item active={bibleVersion == "web"} eventKey="web" onClick={(e) => { dispatch(changeVersionAction("web")); }} action variant="dark">
                    World English Bible
                  </ListGroup.Item>
                  <ListGroup.Item active={bibleVersion == "ylt"} eventKey="ylt" onClick={(e) => { dispatch(changeVersionAction("ylt")); }} action variant="light">
                    Youngs Literal Translations
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col sm={6}>
                <ListGroup>
                  <h5>Font</h5>
                  <ListGroup.Item active={selectedFont == 'Helvetica,Sans-serif, Times, serif;'} eventKey="helvetica" onClick={(e) => { handleFontFamilyChange("Helvetica,Sans-serif, Times, serif;") }} action variant="dark">
                    <Helvetica>Helvetica</Helvetica>
                  </ListGroup.Item>
                  <ListGroup.Item active={selectedFont == 'Courier New, Monospace, Times, serif;'} eventKey="Courier" onClick={(e) => { handleFontFamilyChange("Courier New, Monospace, Times, serif;") }} action variant="light">
                    <CourierNew>Courier New</CourierNew>
                  </ListGroup.Item>
                  <ListGroup.Item active={selectedFont == 'Papyrus,Fantasy, Times, serif;'} eventKey="Papyrus" onClick={(e) => { handleFontFamilyChange("Papyrus,Fantasy, Times, serif;") }} action variant="dark">
                    <Papyrus>Papyrus</Papyrus>
                  </ListGroup.Item>
                  <ListGroup.Item active={selectedFont == 'Georgia,Serif, Times, serif;'} eventKey="Georgia" onClick={(e) => { handleFontFamilyChange("Georgia,Serif, Times, serif;") }} action variant="light">
                    <Georgia>Georgia</Georgia>
                  </ListGroup.Item>
                  <ListGroup.Item active={selectedFont == 'LucidaConsole,Monospace, Times, serif;'} eventKey="Lucida" onClick={(e) => { handleFontFamilyChange("LucidaConsole,Monospace, Times, serif;") }} action variant="dark">
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

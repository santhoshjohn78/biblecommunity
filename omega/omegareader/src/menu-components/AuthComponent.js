import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSelector, useDispatch } from 'react-redux';
import { gotoPageAction } from '../actions';
import styled from 'styled-components';
import { AccountBox } from "../components/accountBox";
import '../common.scss';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

// const Background = styled.div`
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   justify-content: center;
//   align-items: center;
// `;
// const ModalWrapper = styled.div`
// width: 100%;
// height: 100%;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
//   background: #fff;
//   color: #000;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   position: relative;
//   z-index: 10;
//   border-radius: 10px;
// `;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1.0;
`;

function AuthComponent(props) {

    const [showAuthModal, setShowAuthModal] = useState(false);
    const isLogged = useSelector(state => state.loggedIn);

    const onLogin = () => {
        setShowAuthModal(false);
    }
    const [fullscreen, setFullscreen] = useState(true);

    const [showLoginButton, setShowLoginButton] = useState(true);

    const handleOnclick = () => {
        setShowAuthModal(prev => !prev);
    }

    return (
        <div>
            {isLogged == false ? (<Button onClick={handleOnclick} variant="outline-info">Sign In</Button>) : (<Button onClick={handleOnclick} variant="outline-success">Sign Out</Button>)}
            {showAuthModal ? (
                <Modal dialogClassName="fullscreen-modal"
                    show={showAuthModal}
                    onHide={() => setShowAuthModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >


                    <AppContainer >
                        <AccountBox showAuthModal={showAuthModal} onLoginRef={onLogin} />
                    </AppContainer>

                </Modal>
            ) : null}


        </div>
    );
}

export default AuthComponent;
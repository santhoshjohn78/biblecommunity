import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";
import Button from 'react-bootstrap/Button';
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";

const AuthContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10;
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);

    overflow: hidden;
`;
const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;
const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;
const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;
export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: rgb(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;



export const AuthModal = ({ showAuthModal, setShowAuthModal }) => {

    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //const { currentContext } = useContext(AccountContext);



    const switchToSignup = () => {
        // playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    };

    const switchToSignin = () => {
        //  playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400);
    };

    const contextValue = { switchToSignup, switchToSignin };
    return (
        <>
            {showAuthModal ?
                <AuthContainer>
                    <BoxContainer>
                        <TopContainer>
                            <BackDrop >
                            </BackDrop>
                            <HeaderContainer>
                                <HeaderText>Welcome</HeaderText>
                                <HeaderText>Back</HeaderText>
                                <SmallText>Please sign-in to continue!</SmallText>
                            </HeaderContainer>

                        </TopContainer>
                        <InnerContainer>
                            <BoxContainer>
                                <FormContainer>
                                    <Input type="text" placeholder="Full Name" />
                                    <Input type="email" placeholder="Email" />
                                    <Input type="password" placeholder="Password" />
                                    <Input type="password" placeholder="Confirm Password" />
                                </FormContainer>
                                <Marginer direction="vertical" margin={10} />
                                <SubmitButton type="submit">Signup</SubmitButton>
                                <Marginer direction="vertical" margin="1em" />
                                <MutedLink href="#">
                                    Already have an account?
                                    <BoldLink href="#" onClick={switchToSignup}>
                                        Signin
                                    </BoldLink>
                                </MutedLink>
                            </BoxContainer>
                        </InnerContainer>
                    </BoxContainer>
                </AuthContainer>

                : null
            }
        </>
    );
}
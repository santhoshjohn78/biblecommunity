import React, { useContext, useState } from "react";
import {
    BoldLink,
    BoxContainer,
    ErrorText,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import Config from '../../Config';
import { AccountContext } from "./accountContext";
import { saveJwtAction, loggedInAction } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

export function LoginForm(props) {
    const config = new Config();

    const jwtString = useSelector(state => state.jwt);
    const dispatch = useDispatch();
    const { switchToSignup } = useContext(AccountContext);
    const [showDialog, setShowDialog] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const authRequestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: userEmail,
            password: password
        })
    }

    const handleChange = (event) => {

        if (event.target.name === "username") {
            setUserEmail(event.target.value);
        }
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }

    }
    const handleSubmit = (event) => {

        fetch(config.AUTH_URL, authRequestOption).then((response) => {
            if (response.status !== 200) {
                setErrorMessage("Invalid user credentials.");
            }
            return response.json();
        })
            .then((data) => {

                dispatch(saveJwtAction(data.jwtString));
                dispatch(loggedInAction(true))
                setShowDialog(false);
                props.onLoginRef();
            });


        event.preventDefault();
    }

    return (

        <BoxContainer>

            <FormContainer>

                <Input type="email" value={userEmail} onChange={handleChange} name="username" placeholder="Email" />
                <Input type="password" value={password} onChange={handleChange} placeholder="Password" name="password" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
            <ErrorText>{errorMessage}</ErrorText>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Don't have an account?{" "}
                <BoldLink href="#" onClick={switchToSignup}>
                    Signup
                </BoldLink>
            </MutedLink>
        </BoxContainer>

    );
}
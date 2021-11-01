import React, { useContext, useState } from "react";
import {
    BoldLink,
    BoxContainer,
    ErrorText,
    FormContainer,
    InfoText,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import Config from '../../Config';
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
    const config = new Config();
    const { switchToSignin } = useContext(AccountContext);
    const [fullname, setFullname] = useState("");
    const [role, setRole] = useState("reader");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signupRequestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullName: fullname,
            email: userEmail,
            role: role,
            password: password
        })
    }
    const handleSubmit = (event) => {

        fetch(config.SIGNUP_URL, signupRequestOption).then((response) => {
            if (response.status !== 200) {
                setErrorMessage("Error creating user:");
            }
            return response.json();
        })
            .then((data) => {
                setErrorMessage(data.message);


            });


        event.preventDefault();
    }
    const handleChange = (event) => {
        if (event.target.name === "fullname") {
            setFullname(event.target.value);
        }
        if (event.target.name === "username") {
            setUserEmail(event.target.value);
        }
        if (event.target.name === "password") {
            setPassword(event.target.value);
            setErrorMessage("");
        }
        if (event.target.name === "confirmpassword") {
            setConfirmPassword(event.target.value);
            if (password !== event.target.value) {
                setErrorMessage("Passwords do not match!!");
            } else {
                setErrorMessage("");
            }
        }

    }
    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" name="fullname" value={fullname} onChange={handleChange} placeholder="Full Name" />
                <Input type="email" name="username" value={userEmail} onChange={handleChange} placeholder="Email" />
                <Input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                <Input type="password" name="confirmpassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
            <ErrorText>{errorMessage}</ErrorText>

            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>
                    Signin
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}
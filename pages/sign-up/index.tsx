import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const SignUpPage = () => {
    const router = useRouter();

    const emailField = useState("");
    const emailValue = emailField[0];
    const setEmailField = emailField[1];

    const passwordField = useState("");
    const passwordFieldValue = passwordField[0];
    const setPasswordField = passwordField[1]; 

    const confirmPasswordField = useState("");
    const confirmPasswordFieldValue = confirmPasswordField[0];
    const setConfirmPasswordField = confirmPasswordField[1]; 

    const secret = useState("");
    const secretValue = secret[0];
    const setSecret = secret[1];

    const buttonOnClick = async () => {
        if (emailValue == "")
            setSecret("Please Enter a Valid Email");
        else if (confirmPasswordFieldValue == "" || passwordFieldValue == "")
            setSecret("Please Create and Confirm your Password");
        else if (confirmPasswordFieldValue != passwordFieldValue)
            setSecret("Passwords Do Not Match!");
        else {
            await axios.post("/api/user", {
                email: emailValue,
                password: passwordFieldValue,
            });
            router.push("/sign-in");
            setSecret("Registered");
        }
            
    };

    return (
        <div>
            <h1>Sign Up Page - Register for Acquire!</h1>
            <label>
                Email: 
                <input value={emailValue} onChange={(event) => { setEmailField(event.target.value); }}  />
            </label>
            <br/>
            <label>
                Create Password: 
                <input type="password" value={passwordFieldValue} onChange={(event) => setPasswordField(event.target.value)} />
            </label>
            <br/>
            <label>
                Confirm Password: 
                <input type="password" value={confirmPasswordFieldValue} onChange={(event) => setConfirmPasswordField(event.target.value)} />
            </label>
            <br/>
            <button onClick={buttonOnClick}>Register</button>
            <div>{secretValue}</div>
        </div>
    );
};

export default SignUpPage;

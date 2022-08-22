import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
    const router = useRouter();

	const email = useState("");
	const emailValue = email[0];
	const setEmail = email[1]; 

	const passwordField = useState("");
	const passwordFieldValue = passwordField[0];
	const setPasswordField = passwordField[1];

    const signInOnClick = async () => {
        const response = await axios.post("/api/sign-in", {
            email: emailValue,
            password: passwordFieldValue,
        });
        if (response.data.authenticated) {
            localStorage.setItem("token", response.data.token);
            router.push("/dashboard");
        }
    };

    return (
    <div>
        <h1>SignIn</h1>
        <label>
            Email
            <input value={emailValue} onChange={(event) => { setEmail(event.target.value); }}  />
        </label>
        <br/>
        <label>
            Password 
            <input type="Password" value={passwordFieldValue} onChange={(event) => setPasswordField(event.target.value)} />
        </label>
        <br/>
        <Link href="/sign-up">New to Acquire?</Link>
        <br/>
        <button onClick={signInOnClick}>SignIn</button>
	</div>
	);
};

export default SignInPage;

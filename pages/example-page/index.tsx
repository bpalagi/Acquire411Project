import { useState } from "react";

// all of the pages are written inside a folder used as their page route
// the file that exports the page information must be named index.tsx
// after running yarn dev, you can access this page at localhost:3000/example-page

// every variable in typescript is declared with "const" unless
// you intend to change the value later (usually you don't, unless a loop)

// the syntax for functions in typescript can be done in two ways
// function foo(input) {
//   return bar
// }
// const foo = (input) => {
//   return bar   
// }
// they do the same thing, but highlight one key detail in typescript.
// functions can be stored in variables and as a result, can be passed
// around, returned, etc.
// the first implementation is what you are used to, but a big advantage of
// the second form is that you're able to pass in functions without
// declaring them/naming them

// equivalent to "function ExamplePage() {"
const ExamplePage = () => {
    // states are used to store variable information
    // we can't just declare a variable named input because
    // on each page change, the page is rerendered/reloaded

    // states make sure that the variable information is retained
    // on rerender and is the way you want to store all variable information
    // in react

    // page and all states can be reset to initialized values by refreshing the page

    // useState(<initialvalue>) returns two values as a 2 item array, the first
    // contains the value of the state and the second one contains
    // a function to change the state to whatever is passed in setValue(<newvalue>)
    const textField = useState("");
    const textFieldValue = textField[0];
    const setTextField = textField[1]; // this value is a function

    const passwordField = useState("");
    const passwordFieldValue = passwordField[0];
    const setPasswordField = passwordField[1]; // this is also a function

    const secret = useState("");
    const secretValue = secret[0];
    const setSecret = secret[1];

    // react components store data passed in as properties (props) with the syntax as follows:
    // <component prop1={value} props2={value} />
    // if the component has stuff nested inside, the syntax is as follows:
    // <component prop={prop}>
    //   ...nested components...
    // </component>
    // notice the ending is different. If it's a one liner, the ending is just /> but if it is
    // nesting multiple components, you'll have to have a separate tag with </component> to show
    // you wish to close the component

    // each component has their own set of properties which take different things
    // the "input" component has the following components that we'll be using
    // value -> takes the value to display in the field
    // onChange -> takes a function with parameter (event) which has field event.target.value which
    //             contains the text currently typed that triggered the onChange call
    // we take advantage of these two fields by calling the onChange function on every keypress, which will
    // updates the variable that we are displaying (both state values).
    
    // notice on the password field we set the type parameter equal to "password", this makes the value of the
    // input appear as dots

    // the label field wraps the input field so that the label is attached to the input

    // the <br/> tag causes a newline

    // the page returns everything nested inside of one large <div> component. the <div> tag
    // is used to group elements together. All react compnents must return everything under 1 tag
    // so the div is a convenient way to accomplish such.
    
    // defines a function and stores it inside of buttonOnClick to be passed into the button
    // can also be written in-line by doing <button onClick={() => setSecret("boo!")} />
    const buttonOnClick = () => {
        setSecret("boo!");
    };

    return (
        <div>
            <h1>Example Page</h1>
            <label>
                Textfield
                <input value={textFieldValue} onChange={(event) => { setTextField(event.target.value); }}  />
            </label>
            <br/>
            <label>
                Password Field
                <input type="password" value={passwordFieldValue} onChange={(event) => setPasswordField(event.target.value)} />
            </label>
            <br/>
            <button onClick={buttonOnClick}>Click me!</button>
            <div>{secretValue}</div>
        </div>
    );
};

export default ExamplePage;

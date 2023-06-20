import { useState } from "react";
import { signInWithGooglePopup,createUserDocumentFromAuth,signInWithAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signInWithAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();


        } catch(e) {    
            if (e.code === 'auth/wrong-password') {
                alert('Incorrect password for email');
            }
            else if (e.code === 'auth/user-not-found') {
                            alert('Incorrect email');
                        }
            else if (e.code === 'auth/invalid-email') {
                            alert('Incorrect email');
                        }
            else{
                console.log(e);
            }
            
    }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({
                  ...formFields,
                    [name]: value
                });
    };

    return(
        <div className="sign-in=container">
            <h2>Already have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}> 
                
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

                <div className="buttons-container">

                    <Button type="submit">Sign In</Button>

                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google sign In
                    </Button>
                    {/* <button></button> */}

                </div>
            </form>
        </div>
    );
};

export default SignInForm;
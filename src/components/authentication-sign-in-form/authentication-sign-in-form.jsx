import { useState } from "react";
import {
   signInWithGooglePopup, 
   signInUserAuthWithEmailAndPassword, 
} from '../../utils/firebase/firebase.utils'
import AuthenticationFormInput from "../authentication-form-input/authentication-form-input";
import Button from "../button/button.jsx";
import './authentication-sign-in-form.scss'

const defaultFormFields = {
   email: '',
   password: ''
}

const AuthenticationSignInForm = () => {

   const [formFields, setFormFields] = useState(defaultFormFields);
   const {email, password} = formFields;

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const signInWithGoogle = async () => {
      await signInWithGooglePopup();
   }

   const handleSubmit = async (event) => {

      event.preventDefault();

      try {
         await signInUserAuthWithEmailAndPassword(email, password);
         resetFormFields();
      } catch (error) {
         console.log('Error: ', error)
      }
   }

   const handleChange = (event) => {
      const {name, value} = event.target;
      setFormFields({...formFields, [name]:value})
   }

   return (
      <div className="sign-in-container">
         <h2>Existing User?</h2>
         <h1>Please sign in with your email and password.</h1>
         <form onSubmit={handleSubmit}>
            <AuthenticationFormInput 
               label='Email' 
               inputOptions = {{
                  type:'email',
                  required: true,
                  onChange:handleChange,
                  name:'email',
                  value:email
               }}
            />
            <AuthenticationFormInput 
               label='Password'
               inputOptions = {{
                  type:'password',
                  required: true,
                  onChange:handleChange,
                  name:'password',
                  value:password
               }}
            />
            <div className="buttons-container">
               <Button type='submit'>Sign In</Button>
               <Button buttonType='google' onClick={signInWithGoogle}>Sign In With Google</Button>
            </div>
         </form>
      </div>

   )
}

export default AuthenticationSignInForm;
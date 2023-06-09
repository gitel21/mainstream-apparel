import { useState} from "react";
import { createUserAuthWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import AuthenticationFormInput from "../authentication-form-input/authentication-form-input";
import Button from "../button/button.jsx";
import './authentication-sign-up-form.scss'

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
}

const AuthenticationSignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const {displayName, email, password, confirmPassword} = formFields;

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const handleSubmit = async (event) => {

      event.preventDefault();

      if (password !== confirmPassword){
         alert('Passwords must match!')
         return
      } 
      
      try {
         const {user} = await createUserAuthWithEmailAndPassword(
            email,
            password
         );       
         await createUserDocFromAuth(user, {displayName});
         resetFormFields();
         
      } catch (error) {
         if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user, email already in use');
         } else{
         console.log('User creation encountered an error: ', error)
         }
      }
   }

   const handleChange = (event) => {
      const {name, value} = event.target;
      setFormFields({...formFields, [name]:value})
   }
   
   return (
      <div className="sign-up-container">
         <h2>Don't have an account?</h2>
         <h1>Please sign up with your email and password.</h1>
         <form onSubmit={handleSubmit}>
            <AuthenticationFormInput 
               label='Display Name' 
               inputOptions = {{
                  type:'text',
                  required: true,
                  onChange:handleChange,
                  name:'displayName',
                  value:displayName
               }}
            />
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
            <AuthenticationFormInput 
               label='Confirm Password' 
               inputOptions = {{
                  type:'password',
                  required: true,
                  onChange:handleChange,
                  name:'confirmPassword',
                  value:confirmPassword
               }}
            />
            <Button type='submit'>Sign Up</Button>
         </form>
      </div>
   )
}

export default AuthenticationSignUpForm;
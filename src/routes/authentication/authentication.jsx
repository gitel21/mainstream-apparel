import AuthenticationSignUpForm from '../../components/authentication-sign-up-form/authentication-sign-up-form';
import AuthenticationSignInForm from '../../components/authentication-sign-in-form/authentication-sign-in-form';
import './authentication.scss'

const Authentication = () => {

   return (
      <div>
         <h1>Sign In Page</h1>
         <div className='authentication-container'>
            <AuthenticationSignInForm />
            <AuthenticationSignUpForm />
         </div>
      </div>
   )

}

export default Authentication;
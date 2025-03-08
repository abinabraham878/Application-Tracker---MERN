import { useContext, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormToggleLink from "../components/FormToggleLink";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
    const navigate = useNavigate();
    
    const toggleForm = () => {
      setIsSignIn(!isSignIn);
    };
    
    return (
      <AuthLayout
        title={isForgotPasswordClicked ? 'Forgot Your Password?' : (isSignIn ? 'Sign In' : 'Create Account')}
        subtitle={
          isForgotPasswordClicked ? 'Reset your password securely and regain access to your account.' :
          (isSignIn
            ? 'Welcome back! Please sign in to continue.'
            : 'Fill out the form below to create your account.'
          )
        }
      >
        { isForgotPasswordClicked ? <ForgotPassword setIsForgotPasswordClicked={setIsForgotPasswordClicked} /> : (isSignIn ? <SignInForm isForgotPasswordClicked={isForgotPasswordClicked} setIsForgotPasswordClicked={setIsForgotPasswordClicked} /> : <SignUpForm />)}
        { !isForgotPasswordClicked && <FormToggleLink isSignIn={isSignIn} onClick={toggleForm}  />}
      </AuthLayout>
    );
  };

  export default AuthPage;
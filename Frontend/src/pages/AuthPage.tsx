import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormToggleLink from "../components/FormToggleLink";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    
    const toggleForm = () => {
      setIsSignIn(!isSignIn);
    };
    
    return (
      <AuthLayout
        title={isSignIn ? 'Sign In' : 'Create Account'}
        subtitle={
          isSignIn
            ? 'Welcome back! Please sign in to continue.'
            : 'Fill out the form below to create your account.'
        }
      >
        {isSignIn ? <SignInForm /> : <SignUpForm />}
        <FormToggleLink isSignIn={isSignIn} onClick={toggleForm} />
      </AuthLayout>
    );
  };

  export default AuthPage;
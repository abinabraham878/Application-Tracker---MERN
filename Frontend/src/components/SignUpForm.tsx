import { useContext, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import TextLink from "./TextLink";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();

    const { register } = useContext(AuthContext);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Sign Up:', { name, email, password, confirmPassword, agreeTerms });
      if (password !== confirmPassword) {
        // Handle password mismatch
        alert('Passwords do not match');
        return;
      }
      // Add your registration logic here
      await register(name, email, password);
      navigate('/');
    };
    
    return (
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
          
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <PasswordInput
            id="new-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <PasswordInput
            id="confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <TextLink href="#">Terms of Service</TextLink> and <TextLink href="#">Privacy Policy</TextLink>
            </label>
          </div>
        </div>
        
        <div>
          <Button type="submit" variant="primary" fullWidth>
            Create Account
          </Button>
        </div>
      </form>
    );
  };

  export default SignUpForm;
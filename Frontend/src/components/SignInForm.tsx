import { useContext, useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import TextLink from "./TextLink";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await login(email, password);
      navigate('/');
    };
    
    return (
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
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
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between">
            <Checkbox
              id="remember-me"
              name="remember-me"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            
            <div className="text-sm">
              <TextLink href="#">Forgot password?</TextLink>
            </div>
          </div>
        </div>
        
        <div>
          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </div>
      </form>
    );
  };

export default SignInForm;
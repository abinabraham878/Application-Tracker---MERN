import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import TextLink from "./TextLink";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Sign In:', { email, password, rememberMe });
      // Add your authentication logic here
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
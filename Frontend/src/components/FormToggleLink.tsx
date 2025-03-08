// molecules/FormToggleLink.tsx
interface FormToggleLinkProps {
  isSignIn: boolean;
  onClick: () => void;
}

const FormToggleLink = ({ isSignIn, onClick }: FormToggleLinkProps) => {
    return (
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={onClick}
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    );
  };

  export default FormToggleLink;
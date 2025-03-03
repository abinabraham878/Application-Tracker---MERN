import Input from "./Input";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PasswordInput = ({ id, label, value, onChange, required = false }: PasswordInputProps) => {
    return (
      <Input
        id={id}
        name={id}
        type="password"
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={id === "password" ? "current-password" : "new-password"}
      />
    );
  };

export default PasswordInput;
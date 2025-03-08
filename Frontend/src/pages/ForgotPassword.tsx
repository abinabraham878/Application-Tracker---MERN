import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import Select from "../components/Select";
import validateForm from "../utils/formValidation";

const ForgotPassword = ({setIsForgotPasswordClicked}: any) => {

    const formFields = [
        { id: "email", name: "email", label: "Email", type: "text", required: true },
        { id: "password", name: "password", label: "Password", type: "password", required: true },
        { id: "confirmPassword", name: "confirmPassword", label: "Confirm Password", type: "password", required: true }
    ];

    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<any>(() =>
            formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { status: "Sent Application" })
        );

    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        // Remove error when user starts typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData, formFields);
        if (Object.keys(errors).length > 0) {
            setErrors(errors); 
            return;
        }
        await resetPassword(formData.email, formData.password);
        setIsForgotPasswordClicked(false);
        setFormData(() =>
            formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }))
        );
        navigate('/auth');
    };
    
    return (
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {formFields.map((field) => (
            <div className="space-y-4" key={field.id}>
                {field.type === "select" ? (
                    <Select
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    options={field.options?.map((option) => ({ value: option, label: option })) || []}
                    required={field.required}
                />
                ) : (
                    <Input
                            id={field.id}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                )}
                {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
            </div>

        ))}
        
        <div>
          <Button type="submit" variant="primary" fullWidth>
            Update Password
          </Button>
        </div>
      </form>
    );
}

export default ForgotPassword
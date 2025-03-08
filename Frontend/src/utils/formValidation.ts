export default function validateForm(formData: { [key: string]: string }, formFields: { name: string; label: string; required?: boolean }[]) {
    const newErrors: { [key: string]: string } = {};

    // Check required fields
    formFields.forEach((field) => {
        if (field.required && !formData[field.name]) {
            newErrors[field.name] = `${field.label} is required`;
        }
    });

    // Check if password and confirmPassword exist in the form and validate
    if (formData["password"] && formData["confirmPassword"] && formData["password"] !== formData["confirmPassword"]) {
        newErrors["confirmPassword"] = "Password and Confirm Password do not match!";
    }

    return newErrors; // Return the errors object
};
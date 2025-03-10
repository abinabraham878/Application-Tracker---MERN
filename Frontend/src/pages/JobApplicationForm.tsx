import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import { ToastContext } from "../context/ToastContext";
import { JobTrackerContext } from "../context/JobTrackerContext";



const JobApplicationForm = forwardRef(({ onClose, formFields }: any, ref) => {
    const { addToast } = useContext(ToastContext);

    const { saveJobApplication } = useContext(JobTrackerContext);

    const [formData, setFormData] = useState<any>(() =>
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { status: "Sent Application" })
    );

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useImperativeHandle(ref, () => ({
        submit() {
            handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
        }
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        // Remove error when user starts typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        formFields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await saveJobApplication(formData);
            setFormData(() =>
                    formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { status: "Sent Application" })
                );

                onClose();
            
        } catch (error: any) {
            console.error("Error submitting job application:", error);

            if (error?.response) {
                const { status } = error.response;

                if (status === 400) {
                    addToast("warning", "Please check the form fields and try again.");
                } else if (status === 500) {
                    addToast("error", "Server error. Please try again later.");
                } else {
                    addToast("error", "An unexpected error occurred.");
                }
            } else {
                addToast("error", "Network error. Please check your internet connection.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
                <div key={field.id}>
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
        </form>
    );
});

export default JobApplicationForm;

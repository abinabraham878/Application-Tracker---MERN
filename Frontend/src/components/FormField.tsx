import { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  children: ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => {
    return (
      <div className="space-y-1">
        {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
        {children}
      </div>
    );
  };

export default FormField;
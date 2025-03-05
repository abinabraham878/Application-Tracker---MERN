interface SelectAtomProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

const Select: React.FC<SelectAtomProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false
}) => (
    <div className="mb-4">
        <label
            htmlFor={name}
            className="block text-gray-700 text-sm font-bold mb-2"
        >
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default Select;
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    className,
    ...props
}) => {
    return (
        <div className='flex flex-col w-full gap-2.5 mb-5'>
            <label htmlFor={props.id} className='text-sm'>{label}</label>
            <input
                className={`border border-[#CCCCCC] w-full h-11 rounded-lg px-4 outline-none focus:border-[#1ABA1A] transition-colors ${error ? 'border-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
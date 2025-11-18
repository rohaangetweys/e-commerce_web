import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const baseClasses = "rounded-xl text-xs font-semibold transition cursor-pointer";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-100",
        secondary: "bg-black text-white hover:bg-gray-800",
        dark: "bg-[#333333] text-white hover:bg-[#555555]",
        outline: "border border-[#1ABA1A] text-[#1ABA1A] hover:bg-[#1ABA1A] hover:text-white"
    };

    const sizes = {
        sm: "w-[90px] h-[34px]",
        md: "w-[122px] h-9",
        lg: "w-[150px] h-11"
    };

    return (
        <button
            className={cn(baseClasses, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
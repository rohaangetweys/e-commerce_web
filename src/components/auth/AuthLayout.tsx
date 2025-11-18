import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLinkHref
}) => {
    return (
        <div className='bg-white w-full rounded-2xl h-[620px] m-auto flex justify-center items-center'>
            <div className='w-1/2 h-3/4 relative'>
                <Image
                    src="/authpage.png"
                    alt="Auth Illustration"
                    fill
                    className='object-contain'
                />
            </div>

            <div className='w-1/2 h-full flex flex-col justify-center items-start px-12 pr-40'>
                <h1 className='text-[28px] font-bold text-[#1ABA1A] mb-1'>{title}</h1>
                <p className='text-[#999999] tracking-wider mb-6'>{subtitle}</p>

                {children}

                <p className='font-thin text-[13px] text-[#999999]'>
                    {footerText} <a href={footerLinkHref} className='text-[#1aba1a] cursor-pointer hover:underline'>{footerLinkText}</a>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
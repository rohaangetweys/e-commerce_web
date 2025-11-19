'use client';
import React from 'react';
import Button from '@/components/common/Button';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/common/Input';

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="LOGIN TO CONTINUE"
            footerText="NEW USER ?"
            footerLinkText="SIGN UP"
            footerLinkHref="/signup"
        >
            <form onSubmit={handleSubmit} className="w-full">
                <Input
                    label="Email Address"
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="******"
                    required
                />

                <p className='text-[#999999] text-[13px] underline cursor-pointer hover:text-black transition mb-5'>
                    Forget Password?
                </p>

                <Button variant="success" size="md" type="submit" className='mb-4 w-full'>
                    LOGIN
                </Button>
            </form>
        </AuthLayout>
    );
}
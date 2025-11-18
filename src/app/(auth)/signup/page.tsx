'use client';
import React from 'react';
import Button from '@/components/common/Button';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/auth/Input';

export default function SignupPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <AuthLayout
            title="Register"
            subtitle="JOIN US"
            footerText="ALREADY A USER ?"
            footerLinkText="LOGIN"
            footerLinkHref="/login"
        >
            <form onSubmit={handleSubmit} className="w-full">
                <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    required
                />

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

                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    placeholder="******"
                    required
                />

                <Button variant="success" size="md" type="submit" className='mb-4 w-full'>
                    REGISTER
                </Button>
            </form>
        </AuthLayout>
    );
}
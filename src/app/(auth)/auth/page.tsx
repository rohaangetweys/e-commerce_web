'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/common/Input';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AuthPage() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();
    const supabase = createClient();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            toast.success('Login successful!');
            router.push('/');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // Create user profile in users table
                const { error: profileError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: authData.user.id,
                            email: formData.email,
                            full_name: formData.fullName
                        }
                    ]);

                if (profileError) throw profileError;

                toast.success('Registration successful! Please check your email for verification.');
                setIsLoginForm(true);
                setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
            }
        } catch (error: any) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title={isLoginForm ? "Welcome Back!" : "Register"}
            subtitle={isLoginForm ? "LOGIN TO CONTINUE" : "JOIN US"}
            footerText={isLoginForm ? "NEW USER ?" : "ALREADY A USER ?"}
            footerLinkText={isLoginForm ? "SIGN UP" : "LOGIN"}
            footerClick={() => {
                setIsLoginForm(!isLoginForm);
                setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
            }}
        >
            {isLoginForm ? (
                <form onSubmit={handleLogin} className="w-full">
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="******"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Button 
                        variant="success" 
                        size="md" 
                        type="submit" 
                        className="mb-4 w-full"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "LOGIN"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleSignup} className="w-full">
                    <Input
                        label="Full Name"
                        type="text"
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="******"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        placeholder="******"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />

                    <Button 
                        variant="success" 
                        size="md" 
                        type="submit" 
                        className="mb-4 w-full"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "REGISTER"}
                    </Button>
                </form>
            )}
        </AuthLayout>
    );
}
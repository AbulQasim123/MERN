
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { toastErr, toastSucc } from '../utils/toastHelper';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password required'),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Login() {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await Promise.all([
                login(data.email, data.password),
                delay(1000)
            ]);
            toastSucc('Login successful');
            nav('/dashboard');
        } catch (err) {
            toastErr(err?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="mb-3 text-center">Admin Login</h4>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} {...register('email')} />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} {...register('password')} />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>

                                <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle me-1"></i> Login
                                        </>
                                    )}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                Need an account? <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
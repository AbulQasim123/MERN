import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { toastErr, toastSucc } from '../utils/toastHelper';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(5, 'Min 5 chars'),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Register() {
    const nav = useNavigate();
    const { register: registerInput, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    const { register: registerUser, login } = useAuth();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await Promise.all([
                registerUser(data),
                delay(1000)
            ]);
            // await login(data.email, data.password);
            toastSucc('Account created & now you can logged in');
            nav('/login');
        } catch (err) {
            toastErr(err?.response?.data?.message || 'Failed');
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
                            <h4 className="mb-3 text-center">Admin Register</h4>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input className={`form-control ${errors.name && 'is-invalid'}`} {...registerInput('name')} />
                                    <div className="invalid-feedback">{errors.name?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} {...registerInput('email')} />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} {...registerInput('password')} />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                                <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Please wait..
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle me-1"></i> Register
                                        </>
                                    )}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
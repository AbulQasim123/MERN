import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { toastSucc, toastErr } from '../utils/toastHelper';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Invalid email'),
    password: z.string().optional(),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export default function Profile() {
    const nav = useNavigate();
    const { user, fetchProfile, updateProfile } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    /* ---------- Prefill profile ---------- */
    useEffect(() => {
        (async () => {
            try {
                let u = user;
                if (!u) u = await fetchProfile();

                reset({
                    name: u.name,
                    email: u.email,
                    password: '',
                });
            } catch (err) {
                toastErr(err?.response?.data?.message || 'Session expired');
                nav('/login');
            } finally {
                setLoading(false);
            }
        })();
    }, [user, fetchProfile, reset, nav]);

    /* ---------- Update profile ---------- */
    const onSubmit = async (formData) => {
        setSaving(true);
        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password;

            await Promise.all([
                updateProfile(payload),
                delay(1000)
            ]);

            toastSucc('Profile updated successfully');
        } catch (err) {
            toastErr(err?.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <h5 className="mb-0">My Profile</h5>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name *</label>
                            <input
                                className={`form-control ${errors.name && 'is-invalid'}`}
                                {...register('name')}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                {...register('email')}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>

                        <div className="col-12">
                            <label className="form-label">
                                New Password <small>(optional)</small>
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                {...register('password')}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Saving…
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

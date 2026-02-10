import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toastErr } from '../utils/toastHelper';
import { useAuthor } from '../hooks/useAuthor';

/* ----------  Zod schema ---------- */
const schema = z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Invalid email').optional(),
    short_bio: z.string().min(10, 'Short bio must be at least 10 characters long'),
    status: z.string().min(1, 'Status required'),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function AddAuthor() {
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { createAuthor } = useAuthor();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            await Promise.all([
                createAuthor(data),
                delay(500)
            ]);

            nav('/authors');
        } catch (err) {
            toastErr(err?.response?.data?.message || 'Failed');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Add New Author</h5>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => nav(-1)}>
                    <i className="bi bi-arrow-left"></i> Back
                </button>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name *</label>
                            <input className={`form-control ${errors.name && 'is-invalid'}`} {...register('name')} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} {...register('email')} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className={`form-select ${errors.status && 'is-invalid'}`} {...register('status')}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            <div className="invalid-feedback">{errors.status?.message}</div>
                        </div>

                        <div className="col-6">
                            <label className="form-label">Short Bio</label>
                            <textarea rows={3} className={`form-control ${errors.short_bio && 'is-invalid'}`} {...register('short_bio')} />
                            <div className="invalid-feedback">{errors.short_bio?.message}</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary btn-sm me-2" disabled={saving}>
                            {saving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i> Save Author
                                </>
                            )}
                        </button>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => reset()}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
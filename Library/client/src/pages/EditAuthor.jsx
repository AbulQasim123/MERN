import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toastErr } from '../utils/toastHelper';
import { useAuthor } from '../hooks/useAuthor';

/* ----------  Zod schema ---------- */
const schema = z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Invalid email').optional(),
    short_bio: z.string().min(10, 'Short bio must be at least 10 characters'),
    status: z.string().optional(),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function EditAuthor() {
    const { id } = useParams();
    const nav = useNavigate();
    const { getAuthor, updateAuthor } = useAuthor();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });


    useEffect(() => {
        (async () => {
            try {
                const data = await getAuthor(id);
                reset({
                    name: data.name,
                    email: data.email,
                    status: String(data.status),
                    short_bio: data.short_bio,
                });
            } catch (err) {
                toastErr(err?.response?.data?.message || 'Failed');
                nav('/authors');
            } finally {
                setLoading(false);
            }
        })();
    }, [id, getAuthor, reset, nav]);


    const onSubmit = async (formData) => {
        setSaving(true);
        try {
            await Promise.all([
                updateAuthor(id, formData),
                delay(500)
            ]);
            nav('/authors');
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
            <div className="card-header d-flex justify-content-between">
                <h5 className="mb-0">Update Author</h5>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => nav(-1)}>
                    <i className="bi bi-arrow-left"></i> Back
                </button>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label>Name *</label>
                            <input
                                className={`form-control ${errors.name && 'is-invalid'}`}
                                {...register('name')}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label>Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                {...register('email')}
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Status</label>
                            <select
                                className="form-select"
                                {...register('status')}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label>Short Bio</label>
                            <textarea
                                rows={3}
                                className={`form-control ${errors.short_bio && 'is-invalid'}`}
                                {...register('short_bio')}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="btn btn-primary btn-sm" disabled={saving}>
                            {saving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Updating...
                                </>
                            ) : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

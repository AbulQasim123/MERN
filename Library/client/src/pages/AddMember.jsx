import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMember } from '../hooks/useMember';
import { toastErr } from '../utils/toastHelper';

/* ----------  Zod schema ---------- */
const schema = z.object({
    name: z.string().min(3, 'Name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().min(10, 'Valid phone number required'),
    address: z.string().min(10, 'Valid address required'),
    status: z.string().min(1, 'Status required'),
    profile: z.any()
        .refine((files) => files?.length === 1, 'Profile image required')
        .refine(
            (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type),
            'Only JPG/PNG allowed'
        )
        .refine(
            (files) => files[0]?.size <= 2 * 1024 * 1024,
            'Max 2MB allowed'
        ),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function AddMember() {
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { createMember } = useMember();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });


    const onSubmit = async (data) => {
        setSaving(true);
        try {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('address', data.address);
            formData.append('status', data.status);
            formData.append('profile', data.profile[0]);

            await Promise.all([
                createMember(formData),
                delay(500)
            ]);

            nav('/members');
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to create member');
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Add New Member</h5>
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => nav(-1)}
                >
                    <i className="bi bi-arrow-left"></i> Back
                </button>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">Name <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.name && 'is-invalid'}`}
                                {...register('name')}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                {...register('email')}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Phone <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.phone && 'is-invalid'}`}
                                {...register('phone')}
                            />
                            <div className="invalid-feedback">{errors.phone?.message}</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Address <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.address && 'is-invalid'}`}
                                {...register('address')}
                            />
                            <div className="invalid-feedback">{errors.address?.message}</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Profile image <span className="text-danger">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                className={`form-control ${errors.profile && 'is-invalid'}`}
                                {...register('profile')}
                            />
                            <div className="invalid-feedback">{errors.profile?.message}</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Status</label>
                            <select className={`form-select ${errors.status && 'is-invalid'}`} {...register('status')}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            <div className="invalid-feedback">{errors.status?.message}</div>
                        </div>

                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm me-2"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i> Add Member
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => reset()}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
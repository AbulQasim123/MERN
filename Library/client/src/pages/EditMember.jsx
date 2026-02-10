import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMember } from '../hooks/useMember';
import { toastErr } from '../utils/toastHelper';
const IMAGE_BASE_URL = "http://localhost:2025/uploads";

/* ----------  Zod schema ---------- */
const schema = z.object({
    name: z.string().min(3, 'Name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().min(10, 'Valid phone number required'),
    address: z.string().min(10, 'Valid address required'),
    status: z.string().min(1, 'Status required'),
    profile: z.any().optional()
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function EditMember() {
    const { id } = useParams();
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { updateMember, getMember } = useMember();
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    useEffect(() => {
        (async () => {
            try {
                const data = await getMember(id);
                reset({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    status: String(data.status),
                });
                setPreviewImage(data.profile);
            } catch (err) {
                toastErr(err?.response?.data?.message || 'Failed');
                nav('/members');
            } finally {
                setLoading(false);
            }

        })();
    }, [id, getMember, reset, nav]);

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
                updateMember(id, formData),
                delay(500)
            ]);

            nav('/members');
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to update member');
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
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Edit Member</h5>
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
                            {previewImage && (
                                <img
                                    src={`${IMAGE_BASE_URL}/${previewImage}`}
                                    alt="cover"
                                    className="mt-2 rounded border"
                                    style={{ width: '80px', height: 'auto' }}
                                />
                            )}

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
                            className="btn btn-primary me-2"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i> Update Member
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
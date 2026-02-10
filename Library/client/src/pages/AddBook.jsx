import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../hooks/useBook';
import { toastErr } from '../utils/toastHelper';
import { useAuthor } from '../hooks/useAuthor';
import { useCategory } from '../hooks/useCategory';

/* ----------  Zod schema ---------- */
const schema = z.object({
    title: z.string().min(2, 'Title required'),
    isbn: z.string().min(10, 'Valid ISBN needed'),
    author_id: z.string().min(2, 'Author required'),
    category_id: z.string().min(1, 'Category required'),
    total_copies: z.preprocess(Number, z.number().positive().int()),
    pages: z.preprocess(Number, z.number().positive().int()),
    price: z.preprocess(Number, z.number().positive()),
    published: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
    summary: z.string().min(10, 'Short summary please'),
    status: z.string().min(1, 'Status required'),
    cover: z.any()
        .refine((files) => files?.length === 1, 'Cover image required')
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

export default function AddBook() {
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { createBook } = useBook();
    const { getActiveAuthors } = useAuthor();
    const { getActiveCategories } = useCategory();
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

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

            formData.append('title', data.title);
            formData.append('isbn', data.isbn);
            formData.append('author_id', data.author_id);
            formData.append('category_id', data.category_id);
            formData.append('total_copies', data.total_copies);
            formData.append('pages', data.pages);
            formData.append('price', data.price);
            formData.append('published', data.published);
            formData.append('summary', data.summary);
            formData.append('status', data.status);

            formData.append('cover', data.cover[0]);

            await Promise.all([
                createBook(formData),
                delay(500)
            ]);

            nav('/books');
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to create book');
        } finally {
            setSaving(false);
        }
    };


    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const [authorData, categoryData] = await Promise.all([
                    getActiveAuthors(),
                    getActiveCategories(),
                ]);

                if (!isMounted) return;

                setAuthors(authorData);
                setCategories(categoryData);
            } catch (err) {
                toastErr(err?.response?.data?.message || 'Failed to load data');
            } finally {
                if (isMounted) {
                    setLoadingAuthors(false);
                    setLoadingCategories(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [getActiveAuthors, getActiveCategories]);

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Add New Book</h5>
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
                        <div className="col-md-3">
                            <label className="form-label">Title <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                {...register('title')}
                            />
                            <div className="invalid-feedback">{errors.title?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">ISBN <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${errors.isbn && 'is-invalid'}`}
                                {...register('isbn')}
                            />
                            <div className="invalid-feedback">{errors.isbn?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Author <span className="text-danger">*</span></label>
                            <select
                                className={`form-select ${errors.author_id && 'is-invalid'}`}
                                {...register('author_id')}
                                disabled={loadingAuthors}
                            >
                                <option value="">-- Select Author --</option>
                                {authors.map((a) => (
                                    <option key={a._id} value={a._id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.author_id?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Category <span className="text-danger">*</span></label>
                            <select
                                className={`form-select ${errors.category_id && 'is-invalid'}`}
                                {...register('category_id')}
                                disabled={loadingCategories}
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.category_id?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Total Copies <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                min="1"
                                className={`form-control ${errors.total_copies && 'is-invalid'}`}
                                {...register('total_copies')}
                            />
                            <div className="invalid-feedback">{errors.total_copies?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Pages <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                min="1"
                                className={`form-control ${errors.pages && 'is-invalid'}`}
                                {...register('pages')}
                            />
                            <div className="invalid-feedback">{errors.pages?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Price (₹) <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className={`form-control ${errors.price && 'is-invalid'}`}
                                {...register('price')}
                            />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Published <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className={`form-control ${errors.published && 'is-invalid'}`}
                                {...register('published')}
                            />
                            <div className="invalid-feedback">{errors.published?.message}</div>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label">Status</label>
                            <select className={`form-select ${errors.status && 'is-invalid'}`} {...register('status')}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            <div className="invalid-feedback">{errors.status?.message}</div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Cover image <span className="text-danger">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                className={`form-control ${errors.cover && 'is-invalid'}`}
                                {...register('cover')}
                            />
                            <div className="invalid-feedback">{errors.cover?.message}</div>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label">Summary <span className="text-danger">*</span></label>
                            <textarea
                                rows="3"
                                className={`form-control ${errors.summary && 'is-invalid'}`}
                                {...register('summary')}
                            />
                            <div className="invalid-feedback">{errors.summary?.message}</div>
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
                                    <i className="bi bi-check-circle me-1"></i> Add Book
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
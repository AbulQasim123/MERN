import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useBookIssue } from '../hooks/useBookIssue';
import { toastErr } from '../utils/toastHelper';
import { useMember } from '../hooks/useMember';
import { useBook } from '../hooks/useBook';

/* ----------  Zod schema ---------- */
const schema = z.object({
    member_id: z
        .string()
        .nullable()
        .refine(val => val !== null, {
            message: 'Member is required',
        }),

    book_id: z
        .string()
        .nullable()
        .refine(val => val !== null, {
            message: 'Book is required',
        }),

    issue_date: z
        .string()
        .refine((d) => !isNaN(Date.parse(d)), 'Invalid issue date'),

    return_date: z
        .string()
        .refine((d) => !isNaN(Date.parse(d)), 'Invalid return date'),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function AddBookIssue() {
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { createBookIssue } = useBookIssue();
    const { getActiveMembers } = useMember();
    const { getActiveBooks } = useBook();
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);

    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            book_id: null,
            member_id: null,
        },
    });


    const onSubmit = async (data) => {
        setSaving(true);
        try {
            await Promise.all([
                createBookIssue(data),
                delay(500)
            ]);

            nav('/book-issue');
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to create book issue');
        } finally {
            setSaving(false);
        }
    };


    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const [memberData, bookData] = await Promise.all([
                    getActiveMembers(),
                    getActiveBooks(),
                ]);

                if (!isMounted) return;

                setMembers(memberData);
                setBooks(bookData);
            } catch (err) {
                toastErr(err?.response?.data?.message || 'Failed to load data');
            } finally {
                if (isMounted) {
                    setLoadingMembers(false);
                    setLoadingBooks(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [getActiveMembers, getActiveBooks]);

    const bookOptions = books.map((b) => ({
        value: b._id,
        label: (
            <div className="d-flex justify-content-between align-items-center">
                <span>{b.title}</span>
                <span className="badge bg-success ms-2">
                    {b.available_copies} left
                </span>
            </div>
        ),
    }));


    const memberOptions = members.map((m) => ({
        value: m._id,
        label: (
            <div className="d-flex flex-column">
                <span className="fw-semibold">{m.name}</span>
                <small className="text-muted">{m.phone}</small>
            </div>
        ),
    }));


    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Add Book Issue</h5>
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
                        <div className="col-md-6">
                            <label className="form-label">
                                Book <span className="text-danger">*</span>
                            </label>

                            <Controller
                                name="book_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={bookOptions}
                                        isLoading={loadingBooks}
                                        placeholder="Select Book"
                                        classNamePrefix="react-select"
                                        onChange={(opt) => field.onChange(opt ? opt.value : null)}

                                        value={bookOptions.find(o => o.value === field.value) || null}
                                    />
                                )}
                            />

                            {errors.book_id && (
                                <div className="text-danger small mt-1">
                                    {errors.book_id.message}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Member <span className="text-danger">*</span>
                            </label>

                            <Controller
                                name="member_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={memberOptions}
                                        placeholder="Select Member"
                                        isLoading={loadingMembers}
                                        classNamePrefix="react-select"
                                        onChange={(opt) => field.onChange(opt ? opt.value : null)}
                                        value={memberOptions.find(o => o.value === field.value) || null}
                                    />
                                )}
                            />

                            {errors.member_id && (
                                <div className="text-danger small mt-1">
                                    {errors.member_id.message}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Issue Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className={`form-control ${errors.issue_date && 'is-invalid'}`}
                                {...register('issue_date')}
                            />
                            <div className="invalid-feedback">{errors.issue_date?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Return Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className={`form-control ${errors.return_date && 'is-invalid'}`}
                                {...register('return_date')}
                            />
                            <div className="invalid-feedback">{errors.return_date?.message}</div>
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
                                    Issuing...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i> Issue Book
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
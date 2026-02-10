import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookIssue } from '../hooks/useBookIssue';
import { toastErr } from '../utils/toastHelper';
import { useMember } from '../hooks/useMember';
import { useBook } from '../hooks/useBook';

/* ----------  Zod schema ---------- */
const schema = z.object({
    member_id: z.string().min(2, 'Member required'),
    book_id: z.string().min(2, 'Book required'),
    issue_date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
    return_date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function EditBookIssue() {
    const { id } = useParams();
    const nav = useNavigate();
    const [saving, setSaving] = useState(false);
    const { updateBookIssue, getBookIssue } = useBookIssue();
    const { getActiveMembers } = useMember();
    const { getActiveBooks } = useBook();
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });


    useEffect(() => {
        if (!loadingMembers && !loadingBooks && id) {
            (async () => {
                try {
                    const data = await getBookIssue(id);

                    reset({
                        member_id: data.member_id?._id || '',
                        book_id: data.book_id?._id || '',
                        issue_date: data.issue_date?.slice(0, 10),
                        return_date: data.return_date?.slice(0, 10),
                    });
                } catch (err) {
                    toastErr(err?.response?.data?.message || 'Failed');
                    nav('/book-issue');
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [id, loadingMembers, loadingBooks, getBookIssue, reset, nav]);


    const onSubmit = async (data) => {
        setSaving(true);
        try {
            await Promise.all([
                updateBookIssue(id, data),
                delay(500)
            ]);

            nav('/book-issue');
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to update book issue');
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
                <h5 className="mb-0">Edit Book Issue</h5>
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
                            <label className="form-label">Book <span className="text-danger">*</span></label>
                            <select
                                className={`form-select ${errors.book_id && 'is-invalid'}`}
                                {...register('book_id')}
                                disabled={loadingBooks}
                            >
                                <option value="">-- Select Book --</option>
                                {books.map((b) => (
                                    <option key={b._id} value={b._id}>
                                        {b.title}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.book_id?.message}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Member <span className="text-danger">*</span></label>
                            <select
                                className={`form-select ${errors.member_id && 'is-invalid'}`}
                                {...register('member_id')}
                                disabled={loadingMembers}
                            >
                                <option value="">-- Select Member --</option>
                                {members.map((m) => (
                                    <option key={m._id} value={m._id}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.member_id?.message}</div>
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
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i> Update
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
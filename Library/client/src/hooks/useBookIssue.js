
import BookIssueAPI from '../api/book-issue-api';
import { toastSucc, toastErr } from "../utils/toastHelper";
import { useCallback } from "react";

export const useBookIssue = () => {
    const getBookIssues = useCallback(async (params) => {
        try {
            const { data } = await BookIssueAPI.list(params);
            return {
                bookIssues: data.data,
                meta: data.meta
            };
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load book issues");
            throw error;
        }
    }, []);

    const getBookIssue = useCallback(async (id) => {
        try {
            const { data } = await BookIssueAPI.get(id);
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load book issue");
            throw error;
        }
    }, []);

    const createBookIssue = useCallback(async (payload) => {
        try {
            const { data } = await BookIssueAPI.create(payload);
            toastSucc('Book issue added');
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to create book issue');
            throw error;
        }
    }, []);

    const updateBookIssue = useCallback(async (id, payload) => {
        try {
            const { data } = await BookIssueAPI.update(id, payload);
            toastSucc('Book issue updated');
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to update book issue');
            throw error;
        }
    }, []);

    const deleteBookIssue = useCallback(async (id) => {
        try {
            await BookIssueAPI.remove(id);
            toastSucc('Book issue deleted');
        } catch (err) {
            toastErr('Delete failed');
            throw err;
        }
    }, []);

    const returnBookIssue = useCallback(async (id) => {
        try {
            await BookIssueAPI.returnBook(id);
            toastSucc('Book returned');
        } catch (err) {
            toastErr('Return failed');
            throw err;
        }
    }, []);

    const downloadReceipt = useCallback(async (id) => {
        try {
            const response = await BookIssueAPI.download(id);
            return response.data;
        } catch (err) {
            toastErr('Download failed');
            throw err;
        }
    }, []);

    return {
        getBookIssues,
        getBookIssue,
        createBookIssue,
        updateBookIssue,
        deleteBookIssue,
        returnBookIssue,
        downloadReceipt,
    }
}
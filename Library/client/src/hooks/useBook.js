
import BookAPI from '../api/book.api';
import { toastSucc, toastErr } from "../utils/toastHelper";
import { useCallback } from "react";

export const useBook = () => {
    const getBooks = useCallback(async (params) => {
        try {
            const { data } = await BookAPI.list(params);
            return {
                books: data.data,
                meta: data.meta
            };
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load books");
            throw error;
        }
    }, []);

    const getBook = useCallback(async (id) => {
        try {
            const { data } = await BookAPI.get(id);
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load book");
            throw error;
        }
    }, []);

    const getActiveBooks = useCallback(async () => {
        try {
            const { data } = await BookAPI.listActive();
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load books");
            throw error;
        }
    }, []);


    const createBook = useCallback(async (payload) => {
        try {
            const { data } = await BookAPI.create(payload);
            toastSucc("Book added");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to create book");
            throw error;
        }
    }, []);



    const updateBook = useCallback(async (id, payload) => {
        try {
            const { data } = await BookAPI.update(id, payload);
            toastSucc("Book updated");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to update book");
            throw error;
        }
    }, []);

    const deleteBook = useCallback(async (id) => {
        try {
            await BookAPI.remove(id);
            toastSucc("Book deleted");
        } catch (err) {
            toastErr("Delete failed");
            throw err;
        }
    }, []);

    return {
        getBooks,
        getBook,
        getActiveBooks,
        createBook,
        updateBook,
        deleteBook,
    }
}
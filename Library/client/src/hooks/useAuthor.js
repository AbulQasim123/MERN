import { useCallback } from "react";
import AuthorAPI from "../api/author.api";
import { toastSucc, toastErr } from "../utils/toastHelper";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useAuthor = () => {

    const getAuthors = useCallback(async (params) => {
        try {
            const { data } = await AuthorAPI.list(params);
            return {
                authors: data.data,
                meta: data.meta
            };
        } catch (err) {
            toastErr(err?.response?.data?.message || "Failed to load authors");
            throw err;
        }
    }, []);

    const getActiveAuthors = useCallback(async () => {
        try {
            const { data } = await AuthorAPI.listActive();
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load authors");
            throw error;
        }
    }, []);

    const getAuthor = useCallback(async (id) => {
        try {
            const { data } = await AuthorAPI.get(id);
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load author");
            throw error;
        }
    }, []);

    const createAuthor = useCallback(async (payload) => {
        try {
            const { data } = await AuthorAPI.create(payload);
            await delay(500);
            toastSucc("Author added");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to create author");
            throw error;
        }
    }, []);

    const updateAuthor = useCallback(async (id, payload) => {
        try {
            const { data } = await AuthorAPI.update(id, payload);
            await delay(500);
            toastSucc("Author updated");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to update author");
            throw error;
        }
    }, []);

    const deleteAuthor = useCallback(async (id) => {
        try {
            await AuthorAPI.remove(id);
            await delay(500);
            toastSucc("Author deleted");
        } catch (error) {
            toastErr("Delete failed");
            throw error;
        }
    }, []);

    return {
        getAuthors,
        getActiveAuthors,
        getAuthor,
        createAuthor,
        updateAuthor,
        deleteAuthor,
    };
};

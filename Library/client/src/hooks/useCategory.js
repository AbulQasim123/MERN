import { useCallback } from "react";
import CategoryAPI from "../api/category.api";
import { toastSucc, toastErr } from "../utils/toastHelper";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useCategory = () => {

    const getCategories = useCallback(async (params) => {
        try {
            const { data } = await CategoryAPI.list(params);
            return {
                categories: data.data,
                meta: data.meta
            };
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load categories");
            throw error;
        }
    }, []);

    const getActiveCategories = useCallback(async () => {
        try {
            const { data } = await CategoryAPI.listActive();
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load categories");
            throw error;
        }
    }, []);

    const getCategory = useCallback(async (id) => {
        try {
            const { data } = await CategoryAPI.get(id);
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load category");
            throw error;
        }
    }, []);

    const createCategory = useCallback(async (payload) => {
        try {
            const { data } = await CategoryAPI.create(payload);
            await delay(500);
            toastSucc("Category added");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to create category");
            throw error;
        }
    }, []);

    const updateCategory = useCallback(async (id, payload) => {
        try {
            const { data } = await CategoryAPI.update(id, payload);
            await delay(500);
            toastSucc("Category updated");
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to update category");
            throw error;
        }
    }, []);

    const deleteCategory = useCallback(async (id) => {
        try {
            await CategoryAPI.remove(id);
            await delay(500);
            toastSucc("Category deleted");
        } catch (error) {
            toastErr("Delete failed");
            throw error;
        }
    }, []);

    return {
        getCategories,
        getActiveCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};

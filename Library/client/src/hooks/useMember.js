
import MemberAPI from '../api/member.api';
import { toastSucc, toastErr } from "../utils/toastHelper";
import { useCallback } from "react";

export const useMember = () => {
    const getMembers = useCallback(async (params) => {
        try {
            const { data } = await MemberAPI.list(params);
            return {
                members: data.data,
                meta: data.meta
            };
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load members");
            throw error;
        }
    }, []);

    const getActiveMembers = useCallback(async () => {
        try {
            const { data } = await MemberAPI.listActive();
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load members");
            throw error;
        }
    }, []);

    const getMember = useCallback(async (id) => {
        try {
            const { data } = await MemberAPI.get(id);
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || "Failed to load member");
            throw error;
        }
    }, []);

    const createMember = useCallback(async (payload) => {
        try {
            const { data } = await MemberAPI.create(payload);
            toastSucc('Member added');
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to create member');
            throw error;
        }
    }, []);

    const updateMember = useCallback(async (id, payload) => {
        try {
            const { data } = await MemberAPI.update(id, payload);
            toastSucc('Member updated');
            return data.data;
        } catch (error) {
            toastErr(error?.response?.data?.message || 'Failed to update member');
            throw error;
        }
    }, []);

    const deleteMember = useCallback(async (id) => {
        try {
            await MemberAPI.remove(id);
            toastSucc('Member deleted');
        } catch (err) {
            toastErr('Delete failed');
            throw err;
        }
    }, []);

    return {
        getMembers,
        getMember,
        createMember,
        getActiveMembers,
        updateMember,
        deleteMember,
    }
}
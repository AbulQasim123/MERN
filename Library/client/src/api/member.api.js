import axiosPrivate from "../utils/axiosPrivate";

const memberApi = {
    list: (params) => axiosPrivate.get('/get-members', { params }),
    create: (data) => axiosPrivate.post('/create-member', data),
    listActive: () => axiosPrivate.get('/get-active-members'),
    get: (id) =>
        axiosPrivate.get('/get-member', {
            params: { id }
        }),

    update: (id, data) =>
        axiosPrivate.put('/update-member', data, {
            params: { id }
        }),

    remove: (id) => axiosPrivate.delete(`/delete-member?id=${id}`),
}

export default memberApi;
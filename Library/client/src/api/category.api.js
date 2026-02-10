import axiosPrivate from "../utils/axiosPrivate";

const categoryApi = {
    list: (params) => axiosPrivate.get('/get-categories', { params }),
    listActive: () => axiosPrivate.get('/get-active-categories'),
    create: (data) => axiosPrivate.post('/create-category', data),

    get: (id) =>
        axiosPrivate.get('/get-category', {
            params: { id }
        }),

    update: (id, data) =>
        axiosPrivate.put('/update-category', data, {
            params: { id }
        }),

    remove: (id) => axiosPrivate.delete('/delete-category', {
        params: { id }
    }),
}

export default categoryApi;
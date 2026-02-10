import axiosPrivate from "../utils/axiosPrivate";

const authorApi = {
    list: (params) => axiosPrivate.get('/get-authors', { params }),
    listActive: () => axiosPrivate.get('/get-active-authors'),
    create: (data) => axiosPrivate.post('/create-author', data),

    get: (id) =>
        axiosPrivate.get('/get-author', {
            params: { id }
        }),

    update: (id, data) =>
        axiosPrivate.put('/update-author', data, {
            params: { id }
        }),

    remove: (id) => axiosPrivate.delete('/delete-author', {
        params: { id }
    }),
}

export default authorApi;

import axiosPrivate from "../utils/axiosPrivate";

const bookApi = {
    list: (params) => axiosPrivate.get('/get-books', { params }),
    listActive: () => axiosPrivate.get('/get-active-books'),
    create: (data) => axiosPrivate.post('/create-book', data),
    get: (id) =>
        axiosPrivate.get('/get-book', {
            params: { id }
        }),

    update: (id, data) =>
        axiosPrivate.put('/update-book', data, {
            params: { id }
        }),
    remove: (id) => axiosPrivate.delete(`/delete-book?id=${id}`),
}

export default bookApi;
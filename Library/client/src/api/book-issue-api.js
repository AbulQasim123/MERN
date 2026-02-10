import axiosPrivate from "../utils/axiosPrivate";

const bookIssueApi = {
    list: (params) => axiosPrivate.get('/get-book-issues', { params }),
    create: (data) => axiosPrivate.post('/create-book-issue', data),
    get: (id) =>
        axiosPrivate.get('/get-book-issue', {
            params: { id }
        }),

    update: (id, data) =>
        axiosPrivate.put('/update-book-issue', data, {
            params: { id }
        }),

    remove: (id) => axiosPrivate.delete(`/delete-book-issue?id=${id}`),
    returnBook: (id) => axiosPrivate.put(`/return-book-issue?id=${id}`),
    download: (id) =>
        axiosPrivate.get(`/download-receipt?id=${id}`, {
            responseType: 'blob',
        }),
}

export default bookIssueApi;
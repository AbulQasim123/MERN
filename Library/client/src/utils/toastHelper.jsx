
import toast from 'react-hot-toast';

export const toastSucc = (msg) => toast.success(msg);
export const toastErr = (msg) => toast.error(msg);
export const toastInfo = (msg) => toast.info(msg);


export const toastSave = (promise) => toast.promise(promise, { loading: 'Saving…', success: 'Saved ✔', error: 'Save failed ✖' });
export const toastDelete = (promise) => toast.promise(promise, { loading: 'Deleting…', success: 'Deleted ✔', error: 'Delete failed ✖' });
export const toastUpdate = (promise) => toast.promise(promise, { loading: 'Updating…', success: 'Updated ✔', error: 'Update failed ✖' });
import { createPortal } from "react-dom";

export default function Modal({ show, onClose, title, children }) {
    if (!show) return null;

    return createPortal(
        <div className="modal fade show d-block" onClick={onClose} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary btn-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.getElementById("portal-root")
    );
}

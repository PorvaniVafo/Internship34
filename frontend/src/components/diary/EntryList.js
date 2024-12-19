import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="modal">
        <div className="modal-content">
            <p>Are you sure you want to delete this entry?</p>
            <button onClick={onConfirm}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    </div>
);

export default ConfirmationModal;

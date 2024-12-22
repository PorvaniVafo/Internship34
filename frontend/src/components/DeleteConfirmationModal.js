import React from 'react';


const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <h3>Are you sure you want to delete this entry?</h3>
            <button onClick={onConfirm}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};


export default DeleteConfirmationModal;

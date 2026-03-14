import React, { useState } from 'react';

export default function Controls({ onSortByIdClick, onSortByGroupClick, onViewToggleClick, onDeleteClick }) {
  const [deleteId, setDeleteId] = useState('');

  return (
    <div className="controls">
      <div className="control-group">
        <button onClick={onSortByGroupClick}>Sort by Group</button>
        <button onClick={onSortByIdClick}>Sort by ID</button>
        <button onClick={onViewToggleClick}>Grid / List View</button>
      </div>
      
      <div className="control-group delete-control">
        <input 
          type="text" 
          placeholder="Enter User ID" 
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="delete-btn" onClick={() => onDeleteClick(deleteId)}>Delete</button>
      </div>
    </div>
  );
}
import React from 'react';
import './FeatureRestrictionModal.css'; 

export const FeatureRestrictionModal = ({ onClose, onUpgrade }) => {
  
  return (
    // Removed onClick={onClose} from here so background clicks do nothing
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Unlock This Feature</h2>
        <p>
          Your current plan doesn't include access to this feature, or you have reached your plan's limit. 
          Upgrade your membership today to unlock this feature.
        </p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onUpgrade}>
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};
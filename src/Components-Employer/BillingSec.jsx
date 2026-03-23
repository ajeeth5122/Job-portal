import React from 'react';
import './Billing.css';

export const BillingSec = () => {
  const billingHistory = [
    { plan: 'PREMIUM / ENTERPRISE', date: 'MARCH 10, 2026', price: '₹ 4999 /-', status: 'ACTIVE', invoice: '#1834' },
    { plan: 'PRO / STANDARD +', date: 'FEBRUARY 10, 2026', price: '₹ 1999 /-', status: 'EXPIRED', invoice: '#1834' },
    { plan: 'PRO / STANDARD', date: 'JANUARY 10, 2026', price: '₹ 1299 /-', status: 'EXPIRED', invoice: '#1834' },
    { plan: 'BASIC / STARTER', date: 'DECEMBER 10, 2026', price: '₹ 699 /-', status: 'EXPIRED', invoice: '#1834' },
    { plan: 'FREE / FREEMIUM', date: 'DECEMBER 10, 2026', price: '₹ 0 /-', status: 'CANCELLED', invoice: '#1834' },
    { plan: 'FREE / FREEMIUM', date: 'NOVEMBER 10, 2026', price: '₹ 0 /-', status: 'EXPIRED', invoice: '#1834' },
  ];

  return (
    <div className="Billing-container">
      <div className="Billing-card Billing-header-card">
        <h2 className="Billing-title-main">Plans & Billing</h2>
        <p className="Billing-subtitle">Manage your details and personal preferences here</p>
      </div>

      <div className="Billing-card Billing-current-plan-card">
        <div className="Billing-plan-info">
          <p className="Billing-section-label">Current Plan</p>
          <div className="Billing-plan-title-row">
            <h3 className="Billing-plan-name-main">Premium / Enterprise</h3>
            <span className="Billing-badge Billing-badge-active">ACTIVE</span>
          </div>
          <p className="Billing-plan-desc">Providing the core tools and services you need at an affordable price</p>
        </div>
        <div className="Billing-plan-actions">
          <span className="Billing-main-price">₹ 4999<small className="Billing-per-month">/ month</small></span>
          <button className="Billing-btn Billing-btn-outline">Cancel Plan</button>
          <button className="Billing-btn Billing-btn-primary">Upgrade Plan</button>
        </div>
      </div>

      <div className="Billing-grid">
        <div className="Billing-card">
          <p className="Billing-section-label">Next Invoices</p>
          <h3 className="Billing-grid-price">₹ 4999/-</h3>
          <div className="Billing-grid-details">
            <p className="Billing-detail-item"><span>Plan Type</span> : Premium / Enterprise (Monthly)</p>
            <p className="Billing-detail-item"><span>Next Invoice</span> : April 10, 2026</p>
          </div>
        </div>

        <div className="Billing-card">
          <div className="Billing-flex-between">
            <p className="Billing-section-label">Payment Method</p>
            <div className="Billing-visa-logo">VISA</div>
          </div>
          <h3 className="Billing-card-number">**** 8721</h3>
          <div className="Billing-flex-between">
            <div className="Billing-grid-details">
              <p className="Billing-detail-item"><span>Name Card</span> : James Calzoni</p>
              <p className="Billing-detail-item"><span>Expired Date</span> : 12/2026</p>
            </div>
            <div className="Billing-card-btn-group">
              <button className="Billing-btn Billing-btn-outline Billing-btn-sm">Change Card</button>
              <button className="Billing-btn-icon-del">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div className="Billing-card Billing-history-card">
        <div className="Billing-flex-between Billing-table-header">
          <h3 className="Billing-history-title">BILLING HISTORY</h3>
          <a href="#" className="Billing-view-link">View history</a>
        </div>
        
        <div className="Billing-list-container">
          <div className="Billing-list-header">
            <div className="Billing-col-plan">PLAN</div>
            <div className="Billing-col-date">DATE</div>
            <div className="Billing-col-price">PRICE</div>
            <div className="Billing-col-status">STATUS</div>
            <div className="Billing-col-invoice">INVOICE</div>
          </div>

          {billingHistory.map((item, index) => (
            <div className="Billing-list-row" key={index}>
              <div className="Billing-col-plan font-bold">{item.plan}</div>
              <div className="Billing-col-date">{item.date}</div>
              <div className="Billing-col-price">{item.price}</div>
              <div className="Billing-col-status">
                <span className={`Billing-status-pill Billing-status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="Billing-col-invoice">
                <span className="Billing-invoice-id">{item.invoice}</span>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
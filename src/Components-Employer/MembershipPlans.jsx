import React, { useState } from 'react';
import './MembershipPlans.css';

export const MembershipPlans = ({ onSelectPlan }) => {
    const [activeTab, setActiveTab] = useState('Monthly');


    const pricingData = {
        Monthly: [
            { name: 'STARTER PLAN', price: 'Free', subtitle: 'Limited Access', color: 'blue', level: 1 },
            { name: 'BUSINESS PLAN', price: '₹ 499', subtitle: 'Basic Plan', color: 'orange', level: 2 },
            { name: 'ENTERPRISE PLAN', price: ' ₹ 999 ', subtitle: 'Professional Plan', color: 'purple', level: 3 },
        ],
        '6 Months': [
            { name: 'BUSINESS PLAN', price: '₹ 449 ', perMonth: true, subtitle: 'Basic Plan', color: 'orange', level: 2 },
            { name: 'ENTERPRISE PLAN', price: '₹ 949 ', perMonth: true, subtitle: 'Professional Plan', color: 'purple', level: 3 },
        ],
        Yearly: [
            { name: 'BUSINESS PLAN', price: '₹ 399 ', perMonth: true, subtitle: 'Basic Plan', color: 'orange', level: 2 },
            { name: 'ENTERPRISE PLAN', price: '₹ 899 ', perMonth: true, subtitle: 'Professional Plan', color: 'purple', level: 3 },
        ],
    };

    const getCalculatedPrice = (priceStr, billingCycle) => {
        const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
        if (isNaN(price)) return 0;

        if (billingCycle === '6 Months') return price * 6;
        if (billingCycle === 'Yearly') return price * 12;
        return price;
    };


    const getFeaturesForPlan = (planLevel) => {
        if (planLevel === 1) { // Starter
            return [
                { text: '3 Jobs Posting', isIncluded: true },
                { text: 'Basic Employer Profile', isIncluded: true },
                { text: 'Standard Support', isIncluded: true },
                { text: 'Account Manager', isIncluded: false },
                { text: 'Analytics', isIncluded: false },
                { text: 'Candidate Search', isIncluded: false },
                { text: 'Highlight Your Job Listing', isIncluded: false },
            ];
        }
        if (planLevel === 2) { // Business
            return [
                { text: '30 Jobs Posting', isIncluded: true },
                { text: 'Featured Employer Profile', isIncluded: true },
                { text: 'Resume Database Access', isIncluded: true },
                { text: 'Priority Support', isIncluded: true },
                { text: 'Basic Account Manager', isIncluded: true },
                { text: 'Basic Analytics', isIncluded: true },
                { text: 'Limited Candidate Search', isIncluded: true },
                { text: 'Highlight Your Job Listing', isIncluded: false },
            ];
        }
        // Enterprise 
        return [
            { text: 'Unlimited Jobs Posting', isIncluded: true },
            { text: 'Premium Employer Profile', isIncluded: true },
            { text: 'Full Resume Database Access', isIncluded: true },
            { text: 'Priority Support', isIncluded: true },
            { text: 'Dedicated Account Manager', isIncluded: true },
            { text: 'Advanced Analytics', isIncluded: true },
            { text: 'Unlimited Candidate Search', isIncluded: true },
            { text: 'Highlight Your Job Listing', isIncluded: true },
        ];
    };

    return (
        <div className="MembershipPlans">
            <div className="MembershipPlans-header-box">
                <h2>Employer Membership Plan</h2>
                <p>Find the best plan to attract top talent</p>
            </div>

            <div className="MembershipPlans-tabs-bar">
                {['Monthly', '6 Months', 'Yearly'].map((tab) => (
                    <button
                        key={tab}
                        className={`MembershipPlans-tab-item ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab} Plan
                    </button>
                ))}
            </div>

            <div className={`MembershipPlans-grid ${pricingData[activeTab].length === 2 ? 'two-cols' : ''}`}>
                {pricingData[activeTab].map((plan, index) => (
                    <div key={index} className="MembershipPlans-card">
                        <div className={`MembershipPlans-banner ${plan.color}`}>
                            {plan.name}
                        </div>
                        <div className="MembershipPlans-content">
                            <div className="MembershipPlans-price-box">
                                <span className="MembershipPlans-amount">
                                    {plan.price}{plan.perMonth && <small>/month</small>}
                                </span>
                                <span className="MembershipPlans-subtitle">{plan.subtitle}</span>
                            </div>
                            <hr className="MembershipPlans-divider" />

                            <ul className="MembershipPlans-features-list">
                                {getFeaturesForPlan(plan.level).map((feat, i) => (
                                    <li key={i} className={feat.isIncluded ? 'included' : 'excluded'}>
                                        <span className="MembershipPlans-icon">
                                            {feat.isIncluded ? '✔' : '✘'}
                                        </span>
                                        {feat.text}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`MembershipPlans-btn-start ${plan.color}`}
                                onClick={() => {
                                    const baseMonthly = parseInt(plan.price.replace(/[^0-9]/g, '')) || 0;
                                    let multiplier = 1;
                                    if (activeTab === '6 Months') multiplier = 6;
                                    if (activeTab === 'Yearly') multiplier = 12;

                                    const subtotal = baseMonthly * multiplier;
                                    const cgst = subtotal * 0.09; // 9% CGST
                                    const sgst = subtotal * 0.09; // 9% SGST
                                    const totalWithTax = subtotal + cgst + sgst;

                                    onSelectPlan({
                                        ...plan,
                                        subtotal,
                                        totalWithTax,
                                        cgst,
                                        sgst
                                    }, activeTab);
                                }}
                            >
                                Get started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
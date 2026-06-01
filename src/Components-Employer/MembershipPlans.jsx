import React, { useState } from 'react';
import './MembershipPlans.css';
import { useJobs } from '../JobContext';
import Tick from '../assets/AdminAssets/Greentick.png';
import RedCross from '../assets/AdminAssets/RedCross.png';
import '../Components-Admin/PublishedPlan.css';
import '../Components-Admin/Membership.css';

export const MembershipPlans = ({ onSelectPlan }) => {
    const [activeTab, setActiveTab] = useState('Monthly');
    const { allPlans, currentEmployer, setCurrentEmployer } = useJobs();

    const getCalculatedTabPlans = () => {
        return (allPlans).map((masterPlan) => {
            const originalPrice = parseFloat(masterPlan.price) || 0;
            if (originalPrice === 0) {
                return {
                    ...masterPlan,
                    currentBillingCycle: activeTab,
                    displayPrice: 0,
                    effectiveDiscount: 0,
                    monthsMultiplier: 1,
                    totalCalculatedAmount: 0
                };
            }

            let discountPercentage = 0;
            let monthsMultiplier = 1;

            if (activeTab === '6 Months') {
                discountPercentage = masterPlan.discount_halfyear;
                monthsMultiplier = 6;
            } else if (activeTab === 'Yearly') {
                discountPercentage = masterPlan.discount_annual;
                monthsMultiplier = 12;
            } else if (activeTab === 'Monthly') {
                discountPercentage = 0;
                monthsMultiplier = 1;
            }

            const discountedPricePerMonth = originalPrice - (originalPrice * (discountPercentage / 100));
            const totalCalculatedAmount = Math.round(discountedPricePerMonth) * monthsMultiplier;

            return {
                ...masterPlan,
                currentBillingCycle: activeTab,
                displayPrice: Math.round(discountedPricePerMonth),
                effectiveDiscount: discountPercentage,
                monthsMultiplier: monthsMultiplier,
                totalCalculatedAmount: totalCalculatedAmount
            };
        });
    };

    const handlePlanSelection = (computedPlan) => {
        const subtotal = computedPlan.totalCalculatedAmount;

        const taxRate = (computedPlan.tax) / 100;
        const cgst = (subtotal * taxRate) / 2;
        const sgst = (subtotal * taxRate) / 2;
        const totalWithTax = subtotal + cgst + sgst;

        onSelectPlan({
            ...computedPlan,
            subtotal: parseFloat(subtotal.toFixed(2)),
            cgst: parseFloat(cgst.toFixed(2)),
            sgst: parseFloat(sgst.toFixed(2)),
            totalWithTax: parseFloat(totalWithTax.toFixed(2)),
            status: 'active'
        });

        setCurrentEmployer(prev => ({
            ...prev,
            membership: {
                planLevel: computedPlan.level,
                planName: computedPlan.name,
                startDate: computedPlan.startDate,
                expiryDate: computedPlan.expiryDate,
                billingCycle: computedPlan.billingCycle,
                status: computedPlan.status,
                paymentDetails: {
                    subtotal: computedPlan.subtotal,
                    tax: computedPlan.cgst + computedPlan.sgst,
                    total: computedPlan.totalWithTax
                }
            }
        }));

    };

    const dynamicPlansToRender = getCalculatedTabPlans();

    return (
        <div className="MembershipPlans">
            <div className="MembershipPlans-header-box">
                <h2>Employer Membership Plan</h2>
                <p>Find the best plan to hire top talent</p>

                {currentEmployer?.membership?.active && (
                    <div className="current-user-status-strip">
                        Your Current Plan: <strong>{currentEmployer.membership.planName}</strong>
                    </div>
                )}
            </div>

            {/* Toggle Billing Tabs */}
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

            {/* Grid display */}
            <div className={`MembershipPlans-grid ${dynamicPlansToRender.length === 2 ? 'two-cols' : ''}`}>
                {dynamicPlansToRender.map((plan) => {
                    const isUserCurrentPlan =
                        currentEmployer?.membership?.active &&
                        currentEmployer?.membership?.planLevel === plan.planLevel;

                    return (
                        <div key={plan.id} className={`MembershipPlans-card ${isUserCurrentPlan ? 'is-active-plan' : ''}`}>
                            <div
                                className="MembershipPlans-banner"
                                style={{ backgroundColor: plan.color || '#1e90ff' }}
                            >
                                {plan.PlanName}
                                {plan.effectiveDiscount > 0 && (
                                    <span className="discount-tag-badge"> ({plan.effectiveDiscount}% OFF)</span>
                                )}
                            </div>

                            <div className="MembershipPlans-content">
                                <div className="MembershipPlans-price-box">
                                    <div className="MembershipPlans-amount-container">
                                        {plan.displayPrice === 0 ? (
                                            <span className="MembershipPlans-amount">Free</span>
                                        ) : (
                                            <>
                                                {plan.effectiveDiscount > 0 && (
                                                    <span className="original-strike-price">₹{plan.price}</span>
                                                )}
                                                <span className="MembershipPlans-amount">₹ {plan.displayPrice}</span>
                                                <small className="per-month-text">/month</small>
                                            </>
                                        )}
                                    </div>
                                    <span className="MembershipPlans-subtitle">{plan.summary}</span>
                                </div>
                                <hr className="MembershipPlans-divider" />

                                {/* Features List */}
                                <ul className="MembershipPlans-features-list">
                                    {(plan.features || []).map((feat, i) => (
                                        feat.text === 'Jobs Posting' ?
                                            (<li
                                                key={i}
                                                className={'published-plan-feature-item included'}>
                                                <span className="MembershipPlans-icon">
                                                    <img src={Tick} alt={"yes"} width={14}/>
                                                </span>
                                                  Post {feat.value} jobs per month
                                            </li>)
                                            : (<li
                                                key={i}
                                                className={`published-plan-feature-item ${feat.value ? 'included' : 'excluded'}`}
                                            >
                                                <span className="MembershipPlans-icon">
                                                    <img src={feat.value ? Tick : RedCross} alt={feat.value ? "yes" : "no"} width={15} />
                                                </span>
                                                <span className="published-plan-feature-text">
                                                    {feat.value ? <strong style={{ marginRight: '5px' }}>{feat.value}</strong> : null}
                                                    {feat.text}
                                                </span>
                                            </li>)
                                    ))}
                                </ul>

                                <button
                                    className={`MembershipPlans-btn-start ${isUserCurrentPlan ? 'btn-disabled' : ''}`}
                                    style={{ backgroundColor: isUserCurrentPlan ? '#cccccc' : (plan.color || '#1e90ff'), color: isUserCurrentPlan ? '#666666' : '#ffffff' }}
                                    onClick={() => !isUserCurrentPlan && handlePlanSelection(plan)}
                                    disabled={isUserCurrentPlan}
                                >
                                    {isUserCurrentPlan ? 'Your Current Plan' : (plan.displayPrice === 0 ? 'Get started' : 'Subscribe Now')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
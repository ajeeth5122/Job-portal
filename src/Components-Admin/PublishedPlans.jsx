import React, { useState } from 'react';
import SixDots from '../assets/AdminAssets/SixDots.png';
import Save from '../assets/AdminAssets/SaveDraft.png';
import Tick from '../assets/AdminAssets/Greentick.png';
import RedCross from '../assets/AdminAssets/RedCross.png';
import './PublishedPlan.css';
import './Membership.css';
import { useJobs } from '../JobContext';

export const PublishedPlans = () => {
  const { allPlans, setAllPlans } = useJobs()
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [previewPlan, setPreviewPlan] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Helper function to calculate total payable amount
  const calculateTotalPayable = (basePrice, tax) => {

    let price = parseFloat(basePrice) || 0;

    const taxAmt = price * (tax / 100)

    const finalTotal = price + taxAmt;

    return finalTotal.toFixed(2);
  };

  const handleFeatureValueChange = (featureIdx, value) => {
    const updatedFeatures = editPlan.features.map((feature, i) => {
      if (i === featureIdx) {
        return { ...feature, value: value };
      }
      return feature;
    });
    setEditPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    const CopiedPlan = JSON.parse(JSON.stringify(plan));
    setEditPlan(CopiedPlan);
    setPreviewPlan(CopiedPlan);
  };

  const handleInputChange = (field, value) => {
    setEditPlan(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const handleToggleFeature = (featureIdx) => {
    const updatedFeatures = editPlan.features.map((feature, i) => {
      if (i === featureIdx) {
        return { ...feature, value: !feature.value };
      }
      return feature;
    });
    setEditPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleAutoRenewalToggle = () => {
    setEditPlan(prev => ({ ...prev, isAutoRenewal: !prev.isAutoRenewal }));
  };

  const handleTriggerPreview = () => {
    setPreviewPlan({ ...editPlan });
  };

  const handleTrailToggle = () => {
    setEditPlan(prev => ({
      ...prev,
      isTrialEnabled: !prev.isTrialEnabled,
      TrailDuration: !prev.isTrialEnabled ? "7" : "0"
    }));
  };

  const handleSavePlan = () => {
    setAllPlans(prevPlans =>
      prevPlans.map(plan => plan.id === selectedPlanId ? { ...editPlan } : plan)
    );
    alert("Changes in this plan is saved successfully");
  };

  return (
    <>
      {!selectedPlanId ? (
        <>
          <div style={{ margin: "25px 0px", padding: "15px 0", border: "1px solid #afaaaa", borderRadius: "10px" }}>
            <p style={{ margin: "5px 0" }} className='Admin-Welcome-Note'>Published Plans</p>
            <p style={{ margin: "5px 0" }} className='Admin-Welcome-para'>View or Edit Published plans</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid #afaaaa", borderRadius: "10px", gap: "35px", padding: "45px 0" }}>
            <p style={{ margin: "5px 0" }} className='Admin-Welcome-para'>Select a plan to View or Edit</p>
            {allPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                style={{
                  padding: "20px 10px",
                  border: "1px solid #afaaaa",
                  width: "35%",
                  borderRadius: "10px",
                  background: plan.color,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
                }}
              >
                {plan.PlanName}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="membership-cr-membership-container">
          <div style={{ display: "flex", alignItems: "center", padding: "10px 15px", margin: "10px 0", gap: "10px" }} >
            <button onClick={() => { setSelectedPlanId(null); setEditPlan(null); setPreviewPlan(null); }}
              style={{ padding: "7px 10px", cursor: 'pointer', fontSize: '14px', backgroundColor: '#1E88E5', color: 'white', border: 'none', borderRadius: "5px" }}>
              Back to plans</button>
            <div className="membership-cr-membership-header">
              <h1 style={{ padding: "10px 20px", flex: "1", fontSize: "18px" }}>Plan Name: {editPlan?.PlanName}</h1>
            </div>
          </div>
          <div className="membership-cr-membership-content">
            <div className="membership-cr-form-sections">

              <div className="membership-cr-form-card">
                <div className="membership-cr-section-title">
                  <span className="membership-cr-step-num">1</span> Basic plan details
                </div>
                <div className="membership-cr-row">
                  <div className="membership-cr-input-group">
                    <label>Plan name</label>
                    <input
                      type="text"
                      value={editPlan?.PlanName || ''}
                      onChange={(e) => handleInputChange('PlanName', e.target.value)}
                    />
                  </div>
                  <div className="membership-cr-input-group">
                    <label>Summary</label>
                    <input
                      type="text"
                      value={editPlan?.summary || ''}
                      onChange={(e) => handleInputChange('summary', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="membership-cr-form-card">
                <div className="membership-cr-section-title">
                  <span className="membership-cr-step-num">2</span> Pricing & Duration
                </div>
                <div className="membership-cr-row">
                  <div className="membership-cr-input-group">
                    <label>Price (₹) for a month</label>
                    <input
                      type="number"
                      value={editPlan?.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>
                  <div className="membership-cr-input-group">
                    <label>Discount (%) for 6 month plan</label>
                    <input
                      type="number"
                      value={editPlan.discount_halfyear}
                      onChange={(e) => handleInputChange('discount_halfyear', e.target.value)}
                    />
                  </div>
                </div>
                <div className="membership-cr-row">
                  <div className="membership-cr-input-group">
                    <label>Discount (%) for Annual plan</label>
                    <input
                      type="number"
                      value={editPlan.discount_annual}
                      onChange={(e) => handleInputChange('discount_annual', e.target.value)}
                    />
                  </div>
                  <div className="membership-cr-input-group">
                    <label>Tax (%)</label>
                    <input
                      type="number"
                      value={editPlan?.tax}
                      onChange={(e) => handleInputChange('tax', e.target.value)}
                    />
                  </div>

                  <div className="membership-cr-total-payable">
                    <p style={{ textAlign: "start", margin: "5px 0", fontWeight: "600" }}>Total Payable</p>
                    <h3 style={{ textAlign: "start", fontSize: "24px" }}>
                      ₹ {calculateTotalPayable(editPlan.price, editPlan.tax)}{" "}
                      <span style={{ fontSize: "16px", fontWeight: "normal", color: "#555" }}>
                        / for a Month
                      </span>
                    </h3>
                    <p style={{ textAlign: "start", margin: "5px 0", fontSize: "12px" }}>(incl. tax after discount)</p>
                  </div>
                </div>
              </div>
              <div className="membership-cr-form-card">
                <div className="membership-cr-section-title">
                  <span className="membership-cr-step-num">3</span> Features & Limits
                </div>
                <table className="membership-cr-features-table">
                  <thead>
                    <tr >
                      <th style={{ textAlign: 'left', padding: '10px' }}>Feature</th>
                      <th style={{ textAlign: 'center', padding: '10px' }}>Limit / Inclusion</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "1px solid #f0f0ff" }}>
                    {editPlan?.features.map((item, i) => (
                      <tr key={i}>
                        {/* Feature Name */}
                        <td style={{ padding: '20px' }}>
                          {item.text}
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          {item.text === 'Jobs Posting' ? (
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => handleFeatureValueChange(i, e.target.value)}
                              placeholder="e.g. 30"
                              style={{ width: '60px', padding: '5px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div
                                className={`membership-cr-toggle-switch ${item.value ? "membership-cr-active" : ""}`}
                                onClick={() => handleToggleFeature(i)}
                              ></div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="membership-cr-form-card membership-cr-mini-section">
                <div className="membership-cr-section-title"><span className="membership-cr-step-num">4</span> Trial Settings</div>
                <div className="membership-cr-row membership-cr-align-center">
                  <div className="membership-cr-toggle-group" >
                    <span>Free trial option</span>
                    <div onClick={handleTrailToggle} className={`membership-cr-toggle-switch  ${editPlan.isTrialEnabled ? "membership-cr-active" : ""}`}></div>
                  </div>
                  <div className="membership-cr-input-group">
                    <label>Total Duration (Days)</label>
                    <input type="number" name="TrailDuration" value={editPlan.TrailDuration} disabled={!editPlan.isTrialEnabled} />
                  </div>
                </div>
              </div>

              <div className="membership-cr-form-card">
                <div className="membership-cr-section-title"><span className="membership-cr-step-num">5</span> Advanced Settings</div>
                <div className="membership-cr-row membership-cr-align-center">
                  <div className="membership-cr-toggle-group" onClick={handleAutoRenewalToggle}>
                    <span>Auto Renewal</span>
                    <div className={`membership-cr-toggle-switch ${editPlan.isAutoRenewal ? 'membership-cr-active' : ''}`}></div>
                  </div>
                  <div className="membership-cr-input-group">
                    <label>Grace Period (Days)</label>
                    <input type="number" name="GraceTime" value={editPlan.GraceTime} onChange={handleInputChange} disabled={!editPlan.isAutoRenewal} />
                  </div>
                </div>
              </div>

              <div className="membership-cr-action-buttons" style={{ display: 'flex', gap: '15px' }}>
                <button
                  type="button"
                  className="membership-cr-btn-preview"
                  onClick={handleTriggerPreview}
                  style={{
                    padding: "12px 24px",
                    background: "#5c6bc0",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Preview Changes
                </button>

                <button
                  type="button"
                  className="membership-cr-btn-save"
                  onClick={handleSavePlan}
                >
                  {Save && <img src={Save} alt="" className="membership-cr-btn-icon" />} Save
                </button>
              </div>
            </div>

            <div className="membership-cr-preview-sidebar">
              {previewPlan && (
                <div className="published-plan-preview-card">
                  <div className="published-plan-badge" style={{ backgroundColor: previewPlan.color }}>
                    {previewPlan.PlanName}
                  </div>


                  <div className="published-plan-content">
                    <div className="published-plan-price-section">
                      <h2 className="published-plan-price">
                        ₹ {calculateTotalPayable(previewPlan.price, previewPlan.tax)}
                      </h2>
                      <small style={{ color: '#555' }}>
                        For a Month
                      </small>
                      <p className="published-plan-sub-badge">{previewPlan.summary}</p>
                    </div>

                    <div className="published-plan-divider"></div>
                    <ul className="published-plan-features">
                      {previewPlan.features.map((feature, i) => (
                        feature.text === 'Jobs Posting' ?
                          (<li
                            key={i}
                            className={'published-plan-feature-item included'}>
                            <span className="published-plan-icon">
                              <img src={Tick} alt={"yes"} width={15} />
                            </span>
                            Post {feature.value} jobs per month
                          </li>)
                          : (<li
                            key={i}
                            className={`published-plan-feature-item ${feature?.value ? 'included' : 'excluded'}`}
                          >
                            <span className="published-plan-icon">
                              <img src={feature?.value ? Tick : RedCross} alt={feature?.value ? "yes" : "no"} width={15} />
                            </span>
                            <span className="published-plan-feature-text">
                              {feature?.value ? <strong style={{ marginRight: '5px' }}>{feature?.value}</strong> : null}
                              {feature?.text}
                            </span>
                          </li>)
                      ))}
                    </ul>

                    <button
                      className="published-plan-btn-get-started"
                      style={{ backgroundColor: previewPlan.color }}
                    >
                      Get started
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
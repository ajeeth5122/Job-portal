import React, { useState } from 'react';
import './PlansBilling.css';
import FileIcon from '../assets/Billing/File_icon.png';
import DeleteIcon from '../assets/Billing/Delete_icon.png';
import { MembershipPlans } from './MembershipPlans';
import { PaymentMethods } from './PaymentMethods';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useJobs } from '../JobContext';

export const PlansBilling = () => {
    const { currentEmployer, setCurrentEmployer } = useJobs();
    const membershipData = currentEmployer?.membership || {};
    const planStatus = membershipData.active ? 'ACTIVE' : 'CANCELLED';

    // State Declarations
    const [pendingInvoices, setPendingInvoices] = useState([]);
    const [view, setView] = useState('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentTab, setPaymentTab] = useState('card');
    const [isCardOnly, setIsCardOnly] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [additionalPlan, setAdditionalPlan] = useState(null);

    const calculateBill = membershipData.billingCycle === "6 Months" ? 6
        : membershipData.billingCycle === "Yearly" ? 12
            : 1;

    const [billingHistory, setBillingHistory] = useState([
        {
            id: membershipData.lastPaymentId || "INV-0000",
            plan: membershipData.planName || "PREVIOUS PLAN",
            date: membershipData.startDate || "N/A",
            price: membershipData.price || "0.00",
            status: planStatus,
            method: "CARD",
            subtotal: (parseFloat(membershipData.price || 0) * 0.8475).toFixed(2),
            cgst: (parseFloat(membershipData.price || 0) * 0.0762).toFixed(2),
            sgst: (parseFloat(membershipData.price || 0) * 0.0762).toFixed(2)
        }
    ]);

    const [savedCards, setSavedCards] = useState([
        { id: 1, name: 'James Calzon', number: '**** 8721', expiry: '12/2026', type: 'visa', isDefault: true }
    ]);

    // Live Expiry Status Checker
    const getLiveStatus = (itemDate, currentStatus) => {
        if (currentStatus === "CANCELLED" || currentStatus === "ON-HOLD") return currentStatus;
        if (!itemDate || itemDate === "N/A") return currentStatus;

        const expiryDate = new Date(itemDate);
        const today = new Date();
        if (today > expiryDate) return "EXPIRED";

        return currentStatus;
    };

    const generateInvoiceId = () => `INV-${Math.floor(1000 + Math.random() * 9000)}`;

    const getCurrentDateFormatted = () => {
        return new Date().toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        }).toUpperCase();
    };

    const downloadInvoicePDF = (data) => {
        const doc = new jsPDF();
        const navyBlue = [0, 43, 85];
        const borderGrey = [220, 220, 220];
        const themeBlue = [21, 87, 176];
        const textWhite = [255, 255, 255];
        const darkGrey = [40, 40, 40];

        const headerH = 32;
        doc.setFillColor(...navyBlue);
        doc.rect(0, 0, 210, headerH, 'F');
        doc.setFillColor(...textWhite);
        doc.rect(0, 0, 135, headerH, 'F');
        doc.triangle(135, 0, 155, 0, 135, headerH, 'F');

        // Header Corporate Text
        doc.setFontSize(22);
        doc.setTextColor(...themeBlue);
        doc.setFont("helvetica", "bold");
        doc.text("job portal", 20, 20);

        doc.setFontSize(26);
        doc.setTextColor(...textWhite);
        doc.text("INVOICE", 190, 20, { align: 'right' });

        // Meta Info
        doc.setFontSize(10);
        doc.setTextColor(...themeBlue);
        doc.text(`Invoice No: ${data.id}`, 20, 45);
        doc.text(`Invoice date: ${data.date}`, 190, 45, { align: 'right' });

        doc.setDrawColor(...borderGrey);
        doc.line(20, 52, 190, 52);

        const cardY = 65;
        const cardH = 45;
        const drawCard = (x, title, lines) => {
            doc.setDrawColor(...borderGrey);
            doc.roundedRect(x, cardY, 55, cardH, 3, 3, 'S');
            doc.setFontSize(10);
            doc.setTextColor(...darkGrey);
            doc.text(title, x + 5, cardY + 8);

            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 100, 100);
            lines.forEach((line, i) => {
                doc.text(String(line), x + 5, cardY + 18 + (i * 6));
            });
        };

        drawCard(20, "Billed To:", [currentEmployer?.company || "N/A", `Email: ${currentEmployer?.email || "N/A"}`]);
        drawCard(80, "Payment Method", [`Method: ${data.method || 'UPI'}`, `Transaction ID: TXN${Math.floor(100000 + Math.random() * 900000)}`, `Payment Date: ${data.date}`, "Status: Paid"]);
        drawCard(140, "Payment Summary", [`Subtotal: Rs. ${data.subtotal}`, `GST (18%): Rs. ${(parseFloat(data.cgst) + parseFloat(data.sgst)).toFixed(2)}`, `Total: Rs. ${data.price}`]);

        doc.setFillColor(...navyBlue);
        doc.roundedRect(20, 125, 170, 8, 1, 1, 'F');
        doc.setFontSize(11);
        doc.setTextColor(...textWhite);
        doc.text("Membership Details", 105, 131, { align: 'center' });

        autoTable(doc, {
            startY: 133,
            head: [['Plan name', 'Billing Cycle', 'Start Date', 'End Date', 'Amount']],
            body: [[
                data.plan,
                membershipData.billingCycle || "Monthly",
                data.date,
                data.nextDate,
                `Rs. ${data.price}`
            ]],
            headStyles: { fillColor: [210, 220, 230], textColor: [0, 0, 0], fontSize: 10, fontStyle: 'bold', halign: 'center' },
            styles: { halign: 'center', cellPadding: 5, lineWidth: 0.1, lineColor: borderGrey, textColor: [40, 40, 40] },
            theme: 'grid',
            margin: { left: 20, right: 20 }
        });

        const footerY = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        doc.text("Notes:", 20, footerY);
        doc.text("• This is a system-generated invoice.", 20, footerY + 7);
        doc.text("• No signature required.", 20, footerY + 14);

        doc.save(`${data.id}_Invoice.pdf`);
    };

    const handleUpgrade = (computedPlan) => {
        const today = new Date();

        const calculateNextInvoiceDate = (durationDays) => {
            const date = new Date();
            date.setDate(date.getDate() + (durationDays || 30));
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        };

        setAdditionalPlan({
            name: computedPlan.name || computedPlan.PlanName,
            level: computedPlan.level || 1,
            price: computedPlan.totalWithTax.toFixed(2),
            subtotal: computedPlan.subtotal.toFixed(2),
            cgst: computedPlan.cgst.toFixed(2),
            sgst: computedPlan.sgst.toFixed(2),
            planType: computedPlan.billingCycle,
            durationDays: computedPlan.duration,
            startDate: today.toISOString().split('T')[0],
            nextInvoice: calculateNextInvoiceDate(computedPlan.duration)
        });

        setIsCardOnly(false);
        setView('payment');
    };

    const handleSaveNewCard = (newMethod) => {
        const isCard = !['UPI', 'NET', 'UPI-App', 'UPI-ID', 'Net Banking'].includes(newMethod.brand);
        if (isCard) {
            const isDuplicate = savedCards.find(card => card.number.slice(-4) === newMethod.last4);
            if (isDuplicate) {
                handleMakeDefault(isDuplicate.id);
            } else {
                const newCard = {
                    id: Date.now(),
                    name: newMethod.name,
                    number: `**** ${newMethod.last4}`,
                    expiry: newMethod.expiry || "12/2030",
                    type: newMethod.brand.toLowerCase().includes('master') ? 'master' : 'visa',
                    isDefault: true
                };
                setSavedCards([newCard, ...savedCards.map(c => ({ ...c, isDefault: false }))]);
            }
        }

        if (additionalPlan) {
            const freshInvoiceId = generateInvoiceId();

            setTimeout(() => {
                const newEntry = {
                    id: freshInvoiceId,
                    plan: additionalPlan.name,
                    date: getCurrentDateFormatted(),
                    nextDate: additionalPlan.nextInvoice,
                    price: additionalPlan.price,
                    subtotal: additionalPlan.subtotal,
                    cgst: additionalPlan.cgst,
                    sgst: additionalPlan.sgst,
                    status: "ACTIVE",
                    method: newMethod.brand.toUpperCase()
                };

                // Sync history array metrics
                setBillingHistory(prev => [
                    newEntry,
                    ...prev.filter(h => h.status !== "PENDING")
                        .map(item => (item.status === "ACTIVE" ? { ...item, status: "CANCELLED" } : item))
                ]);

                setPendingInvoices(prev => [newEntry, ...prev]);

                setCurrentEmployer(prev => ({
                    ...prev,
                    membership: {
                        planLevel: additionalPlan.level,
                        planName: additionalPlan.name,
                        active: true,
                        startDate: new Date().toISOString().split('T')[0],
                        expiryDate: additionalPlan.nextInvoice,
                        billingCycle: additionalPlan.planType,
                        price: parseFloat(additionalPlan.price),
                        lastPaymentId: freshInvoiceId
                    }
                }));

                setAdditionalPlan(null);
                setView('overview');
                alert(`Payment successful via ${newMethod.brand}`);
            }, 1500);
        }
        setView('overview');

    };

    const handleAddCardOnly = () => { setIsCardOnly(true); setPaymentTab('card'); setView('payment'); };
    const handleAddCard = () => { setPaymentTab('card'); setView('payment'); };
    const handleToggleModal = () => setIsModalOpen(!isModalOpen);

    const handleConfirmCancellation = () => {
        const cancellationEntry = {
            id: membershipData.lastPaymentId || "INV-0000",
            plan: membershipData.planName,
            date: getCurrentDateFormatted(),
            price: "0.00",
            status: "CANCELLED",
            method: "N/A",
            subtotal: "0.00",
            cgst: "0.00",
            sgst: "0.00"
        };

        setBillingHistory(prev => [cancellationEntry, ...prev]);
        setCurrentEmployer(prev => ({
            ...prev,
            membership: { ...prev.membership, active: false }
        }));
        setIsModalOpen(false);
    };

    const handleReactivate = () => {
        const reactivateEntry = {
            id: membershipData.lastPaymentId || generateInvoiceId(),
            plan: membershipData.planName || "Standard Plan",
            date: getCurrentDateFormatted(),
            price: membershipData.price || "0.00",
            status: "ACTIVE",
            method: "N/A",
            subtotal: "0.00",
            cgst: "0.00",
            sgst: "0.00"
        };

        setBillingHistory(prev => [reactivateEntry, ...prev]);
        setCurrentEmployer(prev => ({
            ...prev,
            membership: { ...prev.membership, active: true }
        }));
    };

    const openDeletePopup = (id, e) => { if (e) e.stopPropagation(); setCardToDelete(id); };
    const confirmDeleteCard = () => {
        const updated = savedCards.filter(c => c.id !== cardToDelete);
        if (updated.length > 0 && !updated.some(c => c.isDefault)) updated[0].isDefault = true;
        setSavedCards(updated);
        setCardToDelete(null);
    };
    const handleMakeDefault = (id) => setSavedCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    const defaultCard = savedCards.find(c => c.isDefault) || savedCards[0];


    if (view === 'payment') {
        return (
            <div className="PlansBilling-container PlansBilling-animate-view">
                {additionalPlan && (
                    <div className="Checkout-Summary-Banner">
                        <h3>Summary: {additionalPlan.name}</h3>
                        <p>Total Due: ₹{additionalPlan.price} (Incl. GST)</p>
                    </div>
                )}
                <button className="PlansBilling-btn-back" onClick={() => setView('upgrade')}>← Back to Plans</button>
                <PaymentMethods
                    onBack={() => setView('overview')}
                    onCancel={() => setView('overview')}
                    defaultTab={paymentTab}
                    onSave={handleSaveNewCard}
                    savedCards={savedCards}
                    onMakeDefault={handleMakeDefault}
                    onDelete={openDeletePopup}
                    cardOnlyMode={isCardOnly}
                />
            </div>
        );
    }

    if (view === 'upgrade') {
        return (
            <div className="PlansBilling-container">
                <button className="PlansBilling-btn-back" onClick={() => setView('overview')}>Back to Billing</button>
                <MembershipPlans onSelectPlan={handleUpgrade} />
            </div>
        );
    }

    return (
        <div className="PlansBilling-container">
            <div className="PlansBilling-header-box">
                <h1 className="PlansBilling-main-title">Plans & Billing</h1>
                <p className="PlansBilling-sub-title">Manage your details and personal preferences here</p>
            </div>

            <div className="PlansBilling-card PlansBilling-current-plan">
                <div className="PlansBilling-plan-info">
                    <p className="PlansBilling-label">Current Plan</p>
                    <div className="PlansBilling-title-row">
                        <h2 className="PlansBilling-plan-name">{membershipData.planName}</h2>
                        <span className={`PlansBilling-status-badge ${planStatus === 'ACTIVE' ? 'PlansBilling-status-active' : 'PlansBilling-status-cancelled'}`}>
                            {planStatus}
                        </span>
                    </div>
                    <p className="PlansBilling-plan-desc">Providing the core tools and services you need at an affordable price</p>
                </div>
                <div className="PlansBilling-plan-actions">
                    <span className="PlansBilling-main-price">
                        ₹ {(parseFloat(membershipData.price)).toFixed(2)}
                        <small> / {membershipData.billingCycle}</small>
                    </span>
                    <div className="PlansBilling-button-group">
                        {planStatus === 'ACTIVE' ? (
                            <button className="PlansBilling-btn PlansBilling-btn-outline" onClick={handleToggleModal}>Cancel Plan</button>
                        ) : (
                            <button className="PlansBilling-btn PlansBilling-btn-primary" onClick={handleReactivate}>Reactivate Plan</button>
                        )}
                        <button className="PlansBilling-btn PlansBilling-btn-upgrade" onClick={() => setView('upgrade')}>Upgrade Plan</button>
                    </div>
                </div>
            </div>

            <div className="PlansBilling-grid-row">
                <div className="PlansBilling-card PlansBilling-invoice-box" style={{ position: 'relative' }}>
                    <h3 className="PlansBilling-section-title">Next Invoices</h3>
                    <p className="PlansBilling-invoice-price">
                        ₹ {pendingInvoices.length > 0 ? pendingInvoices[0].price : "0.00"}/-
                    </p>

                    <div className="PlansBilling-invoice-details">
                        <div className="PlansBilling-detail-item">
                            <span className="PlansBilling-detail-label">Plan Type</span>
                            <span className="PlansBilling-detail-value">
                                : {pendingInvoices.length > 0 ? pendingInvoices[0].plan : (membershipData.planName || "-")}
                            </span>
                        </div>
                        <div className="PlansBilling-detail-item">
                            <span className="PlansBilling-detail-label">Next Date</span>
                            <span className="PlansBilling-detail-value">
                                : {pendingInvoices.length > 0 ? pendingInvoices[0].nextDate : (membershipData.expiryDate || "-")}
                            </span>
                        </div>
                    </div>

                    {pendingInvoices.length > 1 && (
                        <div className="invoice-multiple-indicator">
                            <span>+{pendingInvoices.length - 1} more pending</span>
                            <div className="invoice-mini-popup">
                                <p className="popup-title">Upcoming Queue</p>
                                {pendingInvoices.slice(1).map((inv, idx) => (
                                    <div key={idx} className="popup-item">
                                        <span>{inv.plan}</span>
                                        <strong>₹{inv.price}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="PlansBilling-card PlansBilling-payment-box">
                    {defaultCard ? (
                        <div className="Billing-Payment-Display" onClick={handleAddCard}>
                            <div className="Billing-Payment-header">
                                <span className="Billing-Payment-title-text">Payment Method</span>
                                <div className="Billing-brand-badge">{defaultCard.type.toUpperCase()}</div>
                            </div>
                            <h3 className="Billing-card-number-large">{defaultCard.number}</h3>
                            <div className="Billing-Payment-footer">
                                <div className="Billing-card-meta">
                                    <div className="meta-row"><span className="meta-label">Name Card</span><span className="meta-value">: {defaultCard.name}</span></div>
                                    <div className="meta-row"><span className="meta-label">Expired Date</span><span className="meta-value">: {defaultCard.expiry}</span></div>
                                </div>
                                <div className="Billing-Payment-actions">
                                    <button className="Billing-btn-change" onClick={(e) => { e.stopPropagation(); handleAddCardOnly(); }}>Change Card</button>
                                    <button className="Billing-btn-delete-icon" onClick={(e) => openDeletePopup(defaultCard.id, e)}>
                                        <img src={DeleteIcon} alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button className="PlansBilling-add-payment-btn" onClick={handleAddCardOnly}>+ Add Your Card Details</button>
                    )}
                </div>
            </div>

            <div className="PlansBilling-card PlansBilling-history-box">
                <div className="PlansBilling-history-header">
                    <h3 className="PlansBilling-history-title">BILLING HISTORY</h3>
                    <span className="PlansBilling-view-history">View history</span>
                </div>
                <div className="PlansBilling-history-content">
                    <table className="History-Table">
                        <thead>
                            <tr><th>PLAN</th><th>DATE</th><th>PRICE</th><th>STATUS</th><th>INVOICE</th></tr>
                        </thead>
                        <tbody>
                            {billingHistory.map((item, index) => (
                                <tr key={index}>
                                    <td className="plan-cell"><strong>{item.plan}</strong></td>
                                    <td>{item.date}</td>
                                    <td>₹ {item.price} /-</td>
                                    <td>
                                        <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                                            {getLiveStatus(item.expiryDate, item.status)}
                                        </span>
                                    </td>
                                    <td className="invoice-cell">
                                        <span className="invoice-id-text">{item.id}</span>
                                        <img src={FileIcon} alt="PDF" title="Download Invoice" className="download-icon" onClick={() => downloadInvoicePDF(item)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {cardToDelete && (
                <div className="PlansBilling-modal-overlay">
                    <div className="PlansBilling-modal-content">
                        <h2 className="PlansBilling-modal-title">DELETE CARD?</h2>
                        <p className="PlansBilling-modal-text">Are you sure you want to remove this payment method? This action cannot be undone.</p>
                        <div className="PlansBilling-modal-actions">
                            <button className="PlansBilling-modal-btn-grey" onClick={() => setCardToDelete(null)}>Cancel</button>
                            <button className="PlansBilling-modal-btn-confirm" style={{ backgroundColor: '#ff4757' }} onClick={confirmDeleteCard}>Delete Card</button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="PlansBilling-modal-overlay">
                    <div className="PlansBilling-modal-content">
                        <h2 className="PlansBilling-modal-title">CONFIRM PLAN CANCELLATION</h2>
                        <div className="PlansBilling-modal-info-card">
                            <h3 className="PlansBilling-modal-plan-name">{membershipData.planName}</h3>
                            <span className="PlansBilling-badge PlansBilling-badge-active">{planStatus}</span>
                        </div>
                        <p className="PlansBilling-modal-text">Are you sure you want to cancel? Cancelling will prevent any future charges.</p>
                        <div className="PlansBilling-modal-actions">
                            <button className="PlansBilling-modal-btn-grey" onClick={handleToggleModal}>Keep My Current Plan</button>
                            <button className="PlansBilling-modal-btn-confirm" onClick={handleConfirmCancellation}>CONFIRM CANCELLATION</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
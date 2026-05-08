import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComplianceSummary from './ComplianceSummary';
import DisplayAllCompliance from './DisplayAllCompliance';

const ComplianceDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Compliance Dashboard</h3>
            </div>

            <ComplianceSummary />

            <div className="card">
                <div className="card-body">
                    <DisplayAllCompliance />
                </div>
            </div>
        </div>
    );
};

export default ComplianceDashboard;
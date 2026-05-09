import React from 'react';
import {ComplianceService, ComplianceSummary,Loader} from '../../../core/registry';
const ComplianceDashboard = () => {
    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Compliance Dashboard</h3>
            </div>

            <ComplianceSummary />

            
        </div>
    );
};

export default ComplianceDashboard;
import React from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState, Loader, ReportAnalytics } from '../../../core/registry';
import { useReportDetails } from '../hooks/useReportDetails';
export default function ReportVisualizer() {
    const { id } = useParams();
    const { reportDetails, isLoading, loadError } = useReportDetails(id);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">Report Analytics {id}</h4>
                <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {isLoading && <Loader message='Loading report data...'/>}

                    {loadError && <EmptyState message={`Error loading report: ${loadError.message}`} />}

                    {!isLoading && !loadError && (
                        <ReportAnalytics record={reportDetails} />
                    )}
                </div>
            </div>
        </div>
    );
}
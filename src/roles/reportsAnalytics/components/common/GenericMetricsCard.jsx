    import React from 'react';

    const GenericMetricsCard = ({ data, title = "Metrics Overview", generatedAt }) => {
        if (!data) return null;

        // Helper: Formats camelCase to "Title Case"
        const formatLabel = (str) =>
            str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

        // Helper: Sophisticated Value Formatter
const formatValue = (key, value) => {
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value); // or return '-'
    }

    if (typeof value !== 'number') return value;

    const k = key.toLowerCase();

    if (k.includes('rate') || k.includes('percentage')) return `${value.toFixed(1)}%`;

    if (k.includes('tax') || k.includes('revenue') || k.includes('amount') || k.includes('budget')) {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'INR', 
            maximumFractionDigits: 0 
        }).format(value);
    }

    return value.toLocaleString();
};

        // Sub-component: Individual Metric Tile
        const MetricTile = ({ label, value }) => (
            <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9fafb', // Very light slate gray
                borderRadius: '8px',
                border: '1px solid #f1f5f9',
                transition: 'transform 0.2s ease',
            }}>
                <span style={{ 
                    display: 'block', 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    color: '#64748b', // Slate 500
                    fontWeight: '600',
                    marginBottom: '4px'
                }}>
                    {formatLabel(label)}
                </span>
                <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    color: '#0f172a', // Slate 900
                    letterSpacing: '-0.02em'
                }}>
                    {formatValue(label, value)}
                </span>
            </div>
        );

        // Filter Logic
        const sections = Object.entries(data).filter(([_, v]) => typeof v === 'object' && v !== null);
        const flatItems = Object.entries(data).filter(([_, v]) => typeof v !== 'object');

        return (
            <div style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '16px', 
                padding: '24px', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                fontFamily: '"Inter", -apple-system, sans-serif',
                color: '#1e293b'
            }}>
                {/* Header Area */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '28px',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '16px'
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
                            {title}
                        </h2>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                            Analytics Snapshot
                        </p>
                    </div>
                    {generatedAt && (
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ 
                                fontSize: '10px', 
                                fontWeight: '700', 
                                color: '#94a3b8', 
                                textTransform: 'uppercase' 
                            }}>
                            
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>
                                Generated On : {new Date(generatedAt).toLocaleDateString()} at {new Date(generatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>
                    )}
                </div>

                {/* General Highlights (Flat items) */}
                {flatItems.length > 0 && (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                        gap: '12px',
                        marginBottom: '32px'
                    }}>
                        {flatItems.map(([key, val]) => (
                            <MetricTile key={key} label={key} value={val} />
                        ))}
                    </div>
                )}

                {/* Grouped Sections (Nested objects) */}
                {sections.map(([key, content]) => (
                    <div key={key} style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: '700', 
                                color: '#334155', 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.05em',
                                marginRight: '12px'
                            }}>
                                {formatLabel(key)}
                            </span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#f1f5f9' }}></div>
                        </div>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
                            gap: '12px' 
                        }}>
                            {Object.entries(content).map(([subKey, subVal]) => (
                                <MetricTile key={subKey} label={subKey} value={subVal} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    export default GenericMetricsCard;
import React from 'react';
import GenericMetricsCard from '../common/GenericMetricsCard';

const TaxMetricsCard = ({ data, generatedAt }) => {
    return (
        <GenericMetricsCard
            title="Tax Analysis"
            data={data}
            generatedAt={generatedAt}
        />
    );
};
export default TaxMetricsCard;
import React from 'react';
import GenericMetricsCard from '../common/GenericMetricsCard';
const ProgramMetricsCard = ({ data, generatedAt }) => {
    return (
        <GenericMetricsCard
            title="Program Performance"
            data={data}
            generatedAt={generatedAt}
        />
    );
};



export default ProgramMetricsCard;
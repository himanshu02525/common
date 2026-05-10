import React from 'react';
import PropTypes from 'prop-types';

const AnalyticsOverview = ({ analytics }) => {
  return (
    <div className="analytics-overview">
      <h3>Analytics Overview</h3>
      <ul>
        {Object.entries(analytics).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

AnalyticsOverview.propTypes = {
  analytics: PropTypes.object.isRequired,
};

export default AnalyticsOverview;
import React from 'react';

export default function StatusCard({ 
  title, 
  data, 
  ChartComponent, 
  ListComponent, 
  listTitle = "Details" 
}) {
  if (!data) return null;

  return (
    <div className="col-12 mb-4">
   
      <div className="card shadow border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
        <div className="row align-items-center g-0">
          <div className="col-md-6 p-4 border-end">
            <h6 className="fw-bold text-secondary mb-3">{title}</h6>
            <div className="d-flex justify-content-center">
               <ChartComponent data={data} />
            </div>
          </div>
          
          <div className="col-md-6 p-4 bg-light">
            <ListComponent title={listTitle} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
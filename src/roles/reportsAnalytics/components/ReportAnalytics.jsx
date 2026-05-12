import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';

const transformToArr = (record) =>
  Object.entries(record || {}).map(([name, value]) => ({ name, value }));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SimplePieChart = ({ record }) => {
  const data = transformToArr(record);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value">
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const SimpleBarChart = ({ record }) => {
  const data = Object.entries(record || {}).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const recordList = ({ title, record }) => (
  <div>
    <h6>{title}</h6>
    <ul>
      {Object.entries(record || {}).map(([key, val]) => (
        <li key={key}>
          {key}: {typeof val === 'object' ? '-' : val}
        </li>
      ))}
    </ul>
  </div>
);

function StatusCard({ title, record, ChartComponent, ListComponent }) {
  if (!record) return null;

  return (
    <div style={{ marginBottom: 20, border: '1px solid #ddd', padding: 20 }}>
      <h4>{title}</h4>
      <ChartComponent record={record} />
      <ListComponent title="Details" record={record} />
    </div>
  );
}

function generateCards(obj) {
  const cards = [];

  function traverse(record, parent = "") {
    for (let key in record) {
      const value = record[key];

      if (typeof value === "object" && value !== null) {
        let isLeaf = true;

        for (let k in value) {
          if (typeof value[k] === "object") {
            isLeaf = false;
            break;
          }
        }

        if (isLeaf) {
          cards.push({
            title: parent ? `${parent} → ${key}` : key,
            record: value
          });
        }

        traverse(value, parent ? `${parent}.${key}` : key);
      }
    }
  }

  traverse(obj);
  return cards;
}

export default function ReportAnalytics({ record }) {
  console.log(record);
  
  if (!record) return <div>No Data</div>;

  let parsed = {};

  try {
    parsed = typeof record.metrics === "string"
      ? JSON.parse(record.metrics)
      : record.metrics || {};
  } catch {
    return <div>Invalid JSON</div>;
  }

  const cards = generateCards(parsed);

  return (
    <div style={{ padding: 20 }}>
      <h2>{record.report_name || "Report"}</h2>
      <p>{record.scope}</p>
      <p>{record.generated_date}</p>

      {cards.map((card, i) => (
        <StatusCard
          key={i}
          title={card.title}
          record={card.record}
          ChartComponent={SimpleBarChart}
          ListComponent={recordList}
        />
      ))}
    </div>
  );
}
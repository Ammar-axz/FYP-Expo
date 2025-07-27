import React from 'react';
import { LineChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';

const pieData = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
];

const total = pieData.reduce((acc, item) => acc + item.value, 0);
const getArcLabel = (params) => `${((params.value / total) * 100).toFixed(0)}%`;

const chartContainerStyle = {
  background: '#fff',
  // borderRadius: '12px',
  boxShadow: '0 0 25px 5px rgba(0,0,0,0.1)',
  padding: '16px',
  margin: '10px',
};

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px' }}>
        
        <div style={chartContainerStyle}>
          <h4>Sales Over Time</h4>
          <LineChart
            xAxis={[{  data: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15] }]}
            series={[{ data: [10, 20, 15, 30, 25, 20, 15, 30, 25 , 35, 40 ,32 , 38 , 42, 40] }]}
            width={460}
            height={280}
          />
        </div>

        <div style={chartContainerStyle}>
          <h4>Monthly Revenue</h4>
          <BarChart
            xAxis={[{  data: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15] }]}
            series={[{ data: [10, 20, 15, 30, 25, 20, 15, 30, 25 , 35, 40 ,32 , 38 , 42, 40] }]}
            width={460}
            height={280}
          />
        </div>

        <div style={chartContainerStyle}>
          <h4>User Segmentation</h4>
          <PieChart
            series={[
              {
                // outerRadius: 80,
                data: pieData,
                arcLabel: getArcLabel,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontSize: 14,
              },
            }}
            width={460}
            height={280}
          />
        </div>

        <div style={chartContainerStyle}>
          <h4>Area Performance</h4>
          <LineChart
            xAxis={[{  data: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15] }]}
            series={[
              {
                data: [10, 20, 15, 30, 25, 20, 15, 30, 25 , 35, 40 ,32 , 38 , 42, 40],
                area: true,
                color: '#00C49F',
              },
            ]}
            width={460}
            height={280}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
'use client';
import { useEffect, useState } from 'react';
import { Card, Progress, Typography, Layout, message } from 'antd';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
    maxWidth: '350px',
  };

  const progressColor = '#91C25F';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const response = await axios.get('http://172.20.10.4:3000/api/v1/wellness/getdashboarddata', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data?.data);
      } catch (err) {
        message.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (!data) return <Text>No data found.</Text>;

  const {
    steps = { total: 0, consumed: 0 },
    sleep = { total: 0, consumed: 0 },
    activeTime = 0,
  } = data;

  const getPercentage = (consumed, total) => {
    if (!total || total === 0) return 0;
    return Math.min(100, Math.round((consumed / total) * 100));
  };

  return (
    <Layout style={{ padding: '24px', background: '#fff', minHeight: '100vh' }}>
      <Content>
        <Title level={4} style={{ marginBottom: '24px' }}>Wellness Overview</Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 🚶 Steps */}
          <Card title="🚶 Steps" size="small" style={cardStyle}>
            <Text strong>{steps.consumed} / {steps.total || 'N/A'} steps</Text>
            <div style={{ marginTop: '8px' }}>
              <Progress
                percent={getPercentage(steps.consumed, steps.total)}
                size="small"
                strokeColor={progressColor}
              />
            </div>
          </Card>

          {/* 🌙 Sleep */}
          <Card title="🌙 Sleep (in minutes)" size="small" style={cardStyle}>
            <Text strong>{sleep.consumed} / {sleep.total || 'N/A'} minutes</Text>
            <div style={{ marginTop: '8px' }}>
              <Progress
                percent={getPercentage(sleep.consumed, sleep.total)}
                size="small"
                strokeColor={progressColor}
              />
            </div>
          </Card>

          {/* 🔥 Active Time */}
          <Card title="🔥 Active Time" size="small" style={cardStyle}>
            <Text strong>{activeTime} minutes</Text>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

// 'use client';
// import { Card, Progress, List, Typography, Layout } from 'antd';
// import {
//   DashboardOutlined,
//   UserOutlined,
//   HeartOutlined,
//   MessageOutlined,
//   LogoutOutlined,
// } from '@ant-design/icons';

// const { Sider, Content } = Layout;
// const { Title, Text } = Typography;

// export default function DashboardPage() {
//   const mockGoals = {
//     steps: {
//       current: 3620,
//       target: 6000,
//     },
//     activeTime: {
//       minutes: 56,
//       targetMinutes: 60,
//       kcal: 1712,
//       distance: '1.23 km',
//     },
//     sleep: {
//       hours: 6,
//       minutes: 30,
//       timeRange: '11:30 pm - 06:00 am',
//       quality: 85,
//     },
//   };

//   const reminders = [
//     '🩺 Annual blood test on 23rd Jan 2025',
//     '👁️ Eye check-up due in March 2025',
//   ];

//   const healthTip = 'Stay hydrated! Aim to drink at least 8 glasses of water per day.';

//   const cardStyle = {
//     borderRadius: '16px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     border: '1px solid #f0f0f0',
//   };

//   const progressStyles = {
//     steps: {
//       strokeColor: '#fa8072',
//     },
//     sleep: {
//       strokeColor: '#91C25F',
//     },
//   };

//   return (
//     <Layout style={{ padding: '24px', background: '#fff', minHeight: '100vh' }}>
//       <Content>
//         <Title level={4} style={{ marginBottom: '24px' }}>Wellness Overview</Title>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
//           {/* 🚶 Steps */}
//           <Card title="🚶 Steps" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
//             <Text strong>{mockGoals.steps.current} / {mockGoals.steps.target} steps</Text>
//             <div style={{ marginTop: '8px' }}>
//               <Progress
//                 percent={Math.round((mockGoals.steps.current / mockGoals.steps.target) * 100)}
//                 size="small"
//                 strokeColor={progressStyles.steps.strokeColor}
//                 status="normal"
//               />
//             </div>
//           </Card>

//           {/* 🔥 Active Time */}
//           <Card title="🔥 Active Time" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
//             <Text strong>{mockGoals.activeTime.minutes} / {mockGoals.activeTime.targetMinutes} mins</Text>
//             <br />
//             <Text type="secondary">{mockGoals.activeTime.kcal} Kcal | {mockGoals.activeTime.distance}</Text>
//           </Card>

//           {/* 🌙 Sleep */}
//           <Card title="🌙 Sleep" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
//             <Text strong>{mockGoals.sleep.hours}h {mockGoals.sleep.minutes}m</Text>
//             <br />
//             <Text type="secondary">{mockGoals.sleep.timeRange}</Text>
//             <div style={{ marginTop: '8px' }}>
//               <Progress
//                 percent={mockGoals.sleep.quality}
//                 size="small"
//                 strokeColor={progressStyles.sleep.strokeColor}
//                 status="success"
//               />
//             </div>
//           </Card>
//         </div>

//         <Card title="🗓️ Preventive Care Reminders" style={cardStyle}>
//           <List
//             size="small"
//             dataSource={reminders}
//             renderItem={(item) => <List.Item style={{ paddingLeft: '0' }}>{item}</List.Item>}
//           />
//         </Card>

//         {/* 💡 Health Tip */}
//         <Card title="💡 Health Tip of the Day" style={cardStyle}>
//           <Text>{healthTip}</Text>
//         </Card>
//       </Content>
//     </Layout>
//   );
// }

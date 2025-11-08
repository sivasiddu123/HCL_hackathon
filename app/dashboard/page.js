'use client';
import { Card, Progress, List, Typography, Layout } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardPage() {
  const mockGoals = {
    steps: {
      current: 3620,
      target: 6000,
    },
    activeTime: {
      minutes: 56,
      targetMinutes: 60,
      kcal: 1712,
      distance: '1.23 km',
    },
    sleep: {
      hours: 6,
      minutes: 30,
      timeRange: '11:30 pm - 06:00 am',
      quality: 85,
    },
  };

  const reminders = [
    '🩺 Annual blood test on 23rd Jan 2025',
    '👁️ Eye check-up due in March 2025',
  ];

  const healthTip = 'Stay hydrated! Aim to drink at least 8 glasses of water per day.';

  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
  };

  const progressStyles = {
    steps: {
      strokeColor: '#fa8072',
    },
    sleep: {
      strokeColor: '#91C25F',
    },
  };

  return (
    <Layout style={{ padding: '24px', background: '#fff', minHeight: '100vh' }}>
      <Content>
        <Title level={4} style={{ marginBottom: '24px' }}>Wellness Overview</Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
          {/* 🚶 Steps */}
          <Card title="🚶 Steps" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
            <Text strong>{mockGoals.steps.current} / {mockGoals.steps.target} steps</Text>
            <div style={{ marginTop: '8px' }}>
              <Progress
                percent={Math.round((mockGoals.steps.current / mockGoals.steps.target) * 100)}
                size="small"
                strokeColor={progressStyles.steps.strokeColor}
                status="normal"
              />
            </div>
          </Card>

          {/* 🔥 Active Time */}
          <Card title="🔥 Active Time" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
            <Text strong>{mockGoals.activeTime.minutes} / {mockGoals.activeTime.targetMinutes} mins</Text>
            <br />
            <Text type="secondary">{mockGoals.activeTime.kcal} Kcal | {mockGoals.activeTime.distance}</Text>
          </Card>

          {/* 🌙 Sleep */}
          <Card title="🌙 Sleep" size="small" style={cardStyle} headStyle={{ border: 'none' }}>
            <Text strong>{mockGoals.sleep.hours}h {mockGoals.sleep.minutes}m</Text>
            <br />
            <Text type="secondary">{mockGoals.sleep.timeRange}</Text>
            <div style={{ marginTop: '8px' }}>
              <Progress
                percent={mockGoals.sleep.quality}
                size="small"
                strokeColor={progressStyles.sleep.strokeColor}
                status="success"
              />
            </div>
          </Card>
        </div>

        <Card title="🗓️ Preventive Care Reminders" style={cardStyle}>
          <List
            size="small"
            dataSource={reminders}
            renderItem={(item) => <List.Item style={{ paddingLeft: '0' }}>{item}</List.Item>}
          />
        </Card>

        {/* 💡 Health Tip */}
        <Card title="💡 Health Tip of the Day" style={cardStyle}>
          <Text>{healthTip}</Text>
        </Card>
      </Content>
    </Layout>
  );
}

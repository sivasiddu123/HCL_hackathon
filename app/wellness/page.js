'use client';
import { Card, Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

export default function WellnessGoalsPage() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log('Submitted Wellness Goals:', values);
    message.success('Wellness goals submitted successfully!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: '2rem',
      }}
    >
      <Card title="💖 Wellness Goals" style={{ width: 500 }}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Sleep Goal */}
          <Form.Item
            label={<Title level={5}>💤 Improve Sleep Quality</Title>}
            name="sleep"
            rules={[{ required: true, message: 'Please enter your sleep goal' }]}
          >
            <Input placeholder="e.g. Sleep 8 hours every night" />
          </Form.Item>

          {/* Weight Loss Goal */}
          <Form.Item
            label={<Title level={5}>⚖️ Lose Weight</Title>}
            name="weight_loss"
            rules={[{ required: true, message: 'Please enter your weight goal' }]}
          >
            <Input placeholder="e.g. Walk 5,000 steps daily" />
          </Form.Item>

          {/* Stress Reduction Goal */}
          <Form.Item
            label={<Title level={5}>🧘‍♀️ Reduce Stress & Anxiety</Title>}
            name="stress_reduction"
            rules={[{ required: true, message: 'Please enter your stress reduction goal' }]}
          >
            <Input placeholder="e.g. Meditate for 10 minutes daily" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Wellness Goals
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

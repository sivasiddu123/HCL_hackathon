'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://172.20.10.4:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          userEmail: values.email,
          password: values.password,
          role: values.role,
          providerId: '12345', // You can make this dynamic too if needed
        }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success('Signup successful! Please login.');
        router.push('/login');
      } else {
        message.error(data?.message || 'Signup failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      message.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Sign Up" style={{ width: 360 }}>
        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select placeholder="Select role">
              <Option value="patient">Patient</Option>
              <Option value="provider">Provider</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form.Item>

          <Button type="link" onClick={() => router.push('/login')} block>
            Already have an account? Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

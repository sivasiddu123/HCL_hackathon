'use client';
import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email === values.email);

    if (exists) {
      message.error('User already exists!');
    } else {
      users.push(values);
      localStorage.setItem('users', JSON.stringify(users));
      message.success('Signup successful! Please login.');
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Sign Up" style={{ width: 350 }}>
        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
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

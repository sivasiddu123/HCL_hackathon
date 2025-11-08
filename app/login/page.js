'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://172.20.10.4:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user or token in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        message.success('Login successful!');
        router.push('/dashboard');
      } else {
        message.error(data?.message || 'Invalid credentials!');
      }
    } catch (error) {
      console.error(error);
      message.error('Server error. Try again later.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
          <Button type="link" onClick={() => router.push('/signup')} block>
            New user? Sign up
          </Button>
        </Form>
      </Card>
    </div>
  );
}

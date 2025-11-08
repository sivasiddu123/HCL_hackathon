'use client';
import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      message.success('Login successful!');
      router.push('/dashboard');
    } else {
      message.error('Invalid credentials!');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
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

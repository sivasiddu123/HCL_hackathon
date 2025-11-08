// app/layout.js or layout.tsx
'use client';

import { Layout, Menu, Typography, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import '../styles/globals.css';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      message.warning('Please login first!');
      router.push('/login');
    } else {
      setUserName(user.name || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    message.success('Logged out successfully!');
    router.push('/login');
  };

  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: '90vh' }}>
          <Sider width={200} style={{ background: '#007bba' }}>
            <div style={{ color: 'white', padding: '2px', fontWeight: 'bold', fontSize: '18px' }}>
              Health
            </div>
            <Menu
              mode="vertical"
              theme="dark"
              selectedKeys={[pathname]}
              style={{ background: '#007bba' }}
              onClick={({ key }) => router.push(key)}
              items={[
                { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                { key: '/profile', icon: <UserOutlined />, label: 'My Profile' },
                { key: '/wellness', icon: <HeartOutlined />, label: 'Wellness Goals' },
                { key: '/messages', icon: <MessageOutlined />, label: 'Messages' },
                { key: '/logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout },
              ]}
            />
          </Sider>

          <Layout>
            <Header style={{ background: '#f5f5f5', padding: '0 20px' }}>
              <Title level={3} style={{ margin: 0 }}>
                Welcome, {userName}
              </Title>
            </Header>

            <Content style={{ margin: '20px', padding: '20px', background: '#fff' }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}

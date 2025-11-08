'use client';

import { Layout, Menu, Typography, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  LogoutOutlined,
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
  const [userEmail, setUserEmail] = useState('');
  const [isAuthPage, setIsAuthPage] = useState(false);

  // ✅ Detect if user is on login/signup
  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    const authPage = publicPaths.includes(pathname);
    setIsAuthPage(authPage);

    if (!authPage) {
      const stored = localStorage.getItem('loggedInUser');
      if (!stored) {
        message.warning('Please login first!');
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(stored);
        // Adjust based on backend response structure
        if (user?.user?.userEmail) {
          setUserEmail(user.user.userEmail);
        } else if (user?.userEmail) {
          setUserEmail(user.userEmail);
        } else {
          setUserEmail('User');
        }
      } catch {
        setUserEmail('User');
      }
    }
  }, [pathname]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    message.success('Logged out successfully!');
    router.push('/login');
  };

  // ✅ If on login/signup → no layout
  if (isAuthPage) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  // ✅ Logged-in layout
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <Sider width={200} style={{ background: '#007bba' }}>
            <div
              style={{
                color: 'white',
                padding: '16px',
                fontWeight: 'bold',
                fontSize: '18px',
                textAlign: 'center',
              }}
            >
              Health
            </div>

            <Menu
              mode="vertical"
              theme="dark"
              selectedKeys={[pathname]}
              style={{ background: '#007bba' }}
              onClick={({ key }) => {
                if (key === '/logout') handleLogout();
                else router.push(key);
              }}
              items={[
                { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                { key: '/profile', icon: <UserOutlined />, label: 'My Profile' },
                { key: '/wellness', icon: <HeartOutlined />, label: 'Wellness Goals' },
                { key: '/messages', icon: <MessageOutlined />, label: 'Messages' },
                { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' },
              ]}
            />
          </Sider>

          {/* Main Area */}
          <Layout>
            <Header style={{ background: '#f5f5f5', padding: '0 20px' }}>
              <Title level={3} style={{ margin: 0 }}>
                Welcome, {userEmail || 'User'}
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

// 'use client';

// import { Layout, Menu, Typography, message } from 'antd';
// import {
//   DashboardOutlined,
//   UserOutlined,
//   HeartOutlined,
//   MessageOutlined,
//   LogoutOutlined
// } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import '../styles/globals.css';
// import 'antd/dist/reset.css';

// const { Header, Sider, Content } = Layout;
// const { Title } = Typography;

// export default function RootLayout({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [userName, setUserName] = useState('User');
//   const [isAuthPage, setIsAuthPage] = useState(false);

//   // 👇 Detect if it's login/signup page
//   useEffect(() => {
//     const publicPaths = ['/login', '/signup'];
//     const authPage = publicPaths.includes(pathname);
//     setIsAuthPage(authPage);

//     if (!authPage) {
//       const user = JSON.parse(localStorage.getItem('loggedInUser'));
//       if (!user) {
//         message.warning('Please login first!');
//         router.push('/login');
//       } else {
//         setUserName(user.name || user.firstName || 'User');
//       }
//     }
//   }, [pathname]);

//   // 👇 Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     message.success('Logged out successfully!');
//     router.push('/login');
//   };

//   // 👇 If it's login/signup — no layout, show page directly
//   if (isAuthPage) {
//     return (
//       <html lang="en">
//         <body>{children}</body>
//       </html>
//     );
//   }

//   // 👇 Authenticated pages with sidebar + header
//   return (
//     <html lang="en">
//       <body>
//         <Layout style={{ minHeight: '100vh' }}>
//           <Sider width={200} style={{ background: '#007bba' }}>
//             <div
//               style={{
//                 color: 'white',
//                 padding: '16px',
//                 fontWeight: 'bold',
//                 fontSize: '18px',
//                 textAlign: 'center',
//               }}
//             >
//               Health
//             </div>

//             <Menu
//               mode="vertical"
//               theme="dark"
//               selectedKeys={[pathname]}
//               style={{ background: '#007bba' }}
//               onClick={({ key }) => {
//                 if (key === '/logout') {
//                   handleLogout();
//                 } else {
//                   router.push(key);
//                 }
//               }}
//               items={[
//                 { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
//                 { key: '/profile', icon: <UserOutlined />, label: 'My Profile' },
//                 { key: '/wellness', icon: <HeartOutlined />, label: 'Wellness Goals' },
//                 { key: '/messages', icon: <MessageOutlined />, label: 'Messages' },
//                 { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' },
//               ]}
//             />
//           </Sider>

//           <Layout>
//             <Header style={{ background: '#f5f5f5', padding: '0 20px' }}>
//               <Title level={3} style={{ margin: 0 }}>
//                 Welcome, {userName}
//               </Title>
//             </Header>

//             <Content style={{ margin: '20px', padding: '20px', background: '#fff' }}>
//               {children}
//             </Content>
//           </Layout>
//         </Layout>
//       </body>
//     </html>
//   );
// }

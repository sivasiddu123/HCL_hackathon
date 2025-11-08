// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Typography,
//   message,
//   Spin,
// } from 'antd';
// import axios from 'axios';

// const { Title, Text } = Typography;

// export default function ProfilePage() {
//   const [form] = Form.useForm();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch profile using token stored in localStorage
//   const fetchProfile = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
//       const token = storedUser?.token;

//       if (!token) {
//         message.error('No token found. Please login again.');
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get('http://172.20.10.4:3000/api/profile/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.success && res.data.user) {
//         const user = res.data.user;
//         setUserData(user);
//         form.setFieldsValue({
//           firstName: user.firstName,
//           lastName: user.lastName,
//           userEmail: user.userEmail,
//           providerId: user.providerId,
//           role: user.role,
//         });
//       } else {
//         message.error('Failed to fetch profile.');
//       }
//     } catch (err) {
//       console.error(err);
//       message.error('Error fetching profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleUpdate = async (values) => {
//     message.success('Profile updated locally. (Add PUT API here if backend ready)');
//     setUserData(values);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Spin tip="Loading profile..." size="large" />
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div
//         style={{
//           textAlign: 'center',
//           marginTop: '20vh',
//         }}
//       >
//         <Text type="danger">⚠️ Failed to load profile. Please login again.</Text>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f2f5',
//         padding: 24,
//       }}
//     >
//       <Card title="👤 My Profile" style={{ width: 500 }}>
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
//           <Form.Item label="Email" name="userEmail">
//             <Input disabled />
//           </Form.Item>

//           <Form.Item
//             label="First Name"
//             name="firstName"
//             rules={[{ required: true, message: 'Enter first name' }]}
//           >
//             <Input placeholder="Enter first name" />
//           </Form.Item>

//           <Form.Item
//             label="Last Name"
//             name="lastName"
//             rules={[{ required: true, message: 'Enter last name' }]}
//           >
//             <Input placeholder="Enter last name" />
//           </Form.Item>

//           <Form.Item label="Provider ID" name="providerId">
//             <Input placeholder="Enter provider ID" />
//           </Form.Item>

//           <Form.Item label="Role" name="role">
//             <Input disabled />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Update Profile
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Spin,
} from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = 'http://172.20.10.4:3000/api/profile';

  // ✅ Fetch profile details
  const fetchProfile = async () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const token = savedUser?.token;

      if (!token) {
        message.error('No token found. Please login again.');
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success && res.data.user) {
        const user = res.data.user;
        setUserData(user);

        form.setFieldsValue({
          firstName: user.firstName,
          lastName: user.lastName,
          userEmail: user.userEmail,
          providerId: user.providerId,
          role: user.role,
        });
      } else {
        message.error('Failed to fetch profile.');
      }
    } catch (err) {
      console.error(err);
      message.error('Error fetching profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Update profile details (PUT)
  const handleUpdate = async (values) => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const token = savedUser?.token;

      if (!token) {
        message.error('Token not found. Please login again.');
        return;
      }

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        userEmail: values.userEmail,
        providerId: values.providerId,
        role: values.role,
      };

      const res = await axios.put(`${API_BASE}/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success) {
        message.success('✅ Profile updated successfully!');
        setUserData({ ...userData, ...payload });
      } else {
        message.error('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      message.error('Error updating profile.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="Loading profile..." size="large" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '20vh',
        }}
      >
        <Text type="danger">⚠️ Failed to load profile. Please login again.</Text>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: 24,
      }}
    >
      <Card title="👤 My Profile" style={{ width: 500 }}>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Email" name="userEmail">
            <Input  />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item label="Provider ID" name="providerId">
            <Input placeholder="Enter provider ID" />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Input  />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

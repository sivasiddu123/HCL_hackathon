'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message
} from 'antd';

const { Text } = Typography;
const { Option } = Select;

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);

  const mockUser = {
    name: 'David',
    email: 'david@example.com',
    password: '123456',
    gender: 'Male',
    goal: 'weight_loss',
    address: 'Bangalore, India'
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const user = savedUser || mockUser;

    if (!savedUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(mockUser));
    }

    setUserData(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      gender: user.gender || '',
      address: user.address || '',
      goal: user.goal || '',
    });
  }, []);

  const handleUpdate = (values) => {
    const updatedUser = {
      ...userData,
      name: values.name,
      gender: values.gender,
      address: values.address,
      goal: values.goal,
    };

    setUserData(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    message.success('Profile updated successfully!');
  };

  if (!userData) return <Text>Loading profile...</Text>;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      padding: '24px'
    }}>
      <Card title="👤 My Profile" style={{ width: 480 }}>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Email">
            <Input value={userData.email} disabled />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your full name" disabled />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Health Goal"
            name="goal"
            rules={[{ required: true, message: 'Please select your health goal' }]}
          >
            <Select placeholder="Select your goal">
              <Option value="sleep">Improve Sleep Quality</Option>
              <Option value="weight_loss">Lose Weight</Option>
              <Option value="stress_reduction">Reduce Stress & Anxiety</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input.TextArea placeholder="Enter your address" autoSize={{ minRows: 2 }} />
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

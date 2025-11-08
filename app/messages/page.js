'use client';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Layout, message, Spin } from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export default function SuggestionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
      const response = await axios.get('http://172.20.10.4:3000/api/v1/wellness/getdashboarddata', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data?.data);
    } catch (error) {
      message.error('Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spin fullscreen />;

  const { steps, sleep, activeTime } = data || {};

  // Suggestions logic
  const suggestions = [];

  // 🚶 Steps
  if (steps?.total === 0) {
    suggestions.push({
      title: 'Set Your Step Goal',
      content: 'You’ve walked 3000 steps but haven’t set a goal yet. Set a daily goal (e.g. 6000–8000 steps) to track your movement better!',
    });
  } else if (steps?.consumed < steps?.total) {
    suggestions.push({
      title: 'Keep Walking!',
      content: `You’ve walked ${steps.consumed} steps. Try to reach your daily goal of ${steps.total} steps.`,
    });
  } else {
    suggestions.push({
      title: 'Great Job!',
      content: 'You’ve reached or exceeded your step goal. Keep it up!',
    });
  }

  // 😴 Sleep
  if (sleep?.total < 300) {
    suggestions.push({
      title: 'Increase Sleep Goal',
      content: `Your sleep goal is only ${sleep.total} minutes. Consider increasing it to at least 420–480 minutes (7–8 hours).`,
    });
  } else if (sleep?.consumed < sleep?.total) {
    suggestions.push({
      title: 'Improve Your Sleep',
      content: `You’ve only slept ${Math.round(sleep.consumed / 60)} hrs. Try to get closer to your goal of ${Math.round(sleep.total / 60)} hrs.`,
    });
  } else {
    suggestions.push({
      title: 'Well Rested!',
      content: 'You’ve had a good amount of sleep. Your body thanks you!',
    });
  }

  // 🔥 Active Time
  if (activeTime === 0) {
    suggestions.push({
      title: 'Get Moving!',
      content: 'You haven’t recorded any active time today. Try to do at least 20–30 minutes of light exercise like walking or stretching.',
    });
  } else {
    suggestions.push({
      title: 'Stay Active',
      content: `You've had ${activeTime} minutes of activity. Great work! Try to keep this consistent.`,
    });
  }

  return (
    <Layout style={{ padding: '24px', minHeight: '100vh', background: '#fff' }}>
      <Content>
        <Title level={3}>Personal Wellness Suggestions</Title>
        <Paragraph type="secondary">Based on your recent activity, here are some suggestions to improve your health and wellness:</Paragraph>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '16px' }}>
          {suggestions.map((suggestion, index) => (
            <Card key={index} title={suggestion.title} bordered style={{ width: 320 }}>
              <Text>{suggestion.content}</Text>
            </Card>
          ))}
        </div>
      </Content>
    </Layout>
  );
}

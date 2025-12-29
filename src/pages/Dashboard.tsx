import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const Dashboard: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Dashboard</Title>
            <Card>
                <p>Welcome to the Dashboard!</p>
            </Card>
        </div>
    );
};

export default Dashboard;

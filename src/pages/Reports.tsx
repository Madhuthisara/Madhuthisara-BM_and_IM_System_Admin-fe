import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const Reports: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Reports</Title>
            <Card>
                <p>View your Reports here.</p>
            </Card>
        </div>
    );
};

export default Reports;

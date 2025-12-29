import React, { useState } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MasterDataSubPageLayout from '../../../components/common/MasterDataSubPageLayout';

const { Text, Title } = Typography;

interface StockData {
    key: string;
    product: string;
    quantity: number;
}

const ProductStock: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string | null>(null);

    const [data, setData] = useState<StockData[]>([]);

    const handleAdd = () => {
        setEditingKey(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: StockData) => {
        setEditingKey(record.key);
        form.setFieldsValue({ product: record.product, quantity: record.quantity });
        setIsModalOpen(true);
    };

    const handleDelete = (key: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this stock entry?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                setData(data.filter((item) => item.key !== key));
            },
        });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingKey) {
                const newData = data.map((item) =>
                    item.key === editingKey ? { ...item, product: values.product, quantity: parseInt(values.quantity) } : item
                );
                setData(newData);
            } else {
                const newData: StockData = { key: Date.now().toString(), product: values.product, quantity: parseInt(values.quantity) };
                setData([...data, newData]);
            }
            setIsModalOpen(false);
            form.resetFields();
            setEditingKey(null);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditingKey(null);
    };

    const columns: ColumnsType<StockData> = [
        { title: 'Product', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Actions', key: 'actions', width: 100, align: 'center',
            render: (_, record) => (
                <Dropdown menu={{
                    items: [
                        {
                            key: 'edit',
                            label: 'Edit',
                            icon: <EditOutlined />,
                            onClick: () => handleEdit(record)
                        },
                        {
                            key: 'delete',
                            label: 'Delete',
                            icon: <DeleteOutlined />,
                            danger: true,
                            onClick: () => handleDelete(record.key)
                        }
                    ]
                }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <MasterDataSubPageLayout title="Product Stock" onAdd={handleAdd} addButtonText="Add Stock">
            <div style={{ marginBottom: 24 }}><Text type="secondary">Manage inventory for final products.</Text></div>
            <Card bordered={false} style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16 }}><Title level={4}>Stock Levels</Title><Text type="secondary">Current stock levels for products.</Text></div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
            <Modal
                title={editingKey ? "Edit Stock" : "Add Stock"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingKey ? "Update" : "Create"}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="product" label="Product" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                </Form>
            </Modal>
        </MasterDataSubPageLayout>
    );
};

export default ProductStock;

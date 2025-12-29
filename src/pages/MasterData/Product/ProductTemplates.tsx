import React, { useState } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MasterDataSubPageLayout from '../../../components/common/MasterDataSubPageLayout';

const { Text, Title } = Typography;

interface TemplateData {
    key: string;
    name: string;
}

const ProductTemplates: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string | null>(null);

    const [data, setData] = useState<TemplateData[]>([]);

    const handleAdd = () => {
        setEditingKey(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: TemplateData) => {
        setEditingKey(record.key);
        form.setFieldsValue({ name: record.name });
        setIsModalOpen(true);
    };

    const handleDelete = (key: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this template?',
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
                    item.key === editingKey ? { ...item, name: values.name } : item
                );
                setData(newData);
            } else {
                const newData: TemplateData = { key: Date.now().toString(), name: values.name };
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

    const columns: ColumnsType<TemplateData> = [
        { title: 'Template Name', dataIndex: 'name', key: 'name' },
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
        <MasterDataSubPageLayout title="Product Templates" onAdd={handleAdd} addButtonText="Add Template">
            <div style={{ marginBottom: 24 }}><Text type="secondary">Define reusable product structures (BOMs).</Text></div>
            <Card bordered={false} style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16 }}><Title level={4}>Templates</Title><Text type="secondary">A list of all product templates.</Text></div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
            <Modal
                title={editingKey ? "Edit Template" : "Add Template"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingKey ? "Update" : "Create"}
            >
                <Form form={form} layout="vertical"><Form.Item name="name" label="Template Name" rules={[{ required: true }]}><Input /></Form.Item></Form>
            </Modal>
        </MasterDataSubPageLayout>
    );
};

export default ProductTemplates;

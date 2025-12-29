import React, { useState } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, Space, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MasterDataSubPageLayout from '../../../components/common/MasterDataSubPageLayout';

const { Text, Title } = Typography;

interface AttributeData {
    key: string;
    name: string;
}

const MaterialAttributes: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string | null>(null);

    // Mock Data
    const [data, setData] = useState<AttributeData[]>([
        { key: '1', name: 'Color' },
        { key: '2', name: 'Design' },
        { key: '3', name: 'Flowers' },
        { key: '4', name: 'Size' },
    ]);

    const handleAdd = () => {
        setEditingKey(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: AttributeData) => {
        setEditingKey(record.key);
        form.setFieldsValue({ name: record.name });
        setIsModalOpen(true);
    };

    const handleDelete = (key: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this attribute?',
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
        form
            .validateFields()
            .then((values) => {
                if (editingKey) {
                    // Edit Mode
                    const newData = data.map((item) =>
                        item.key === editingKey ? { ...item, name: values.name } : item
                    );
                    setData(newData);
                } else {
                    // Create Mode
                    const newData: AttributeData = {
                        key: Date.now().toString(),
                        name: values.name,
                    };
                    setData([...data, newData]);
                }
                setIsModalOpen(false);
                form.resetFields();
                setEditingKey(null);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditingKey(null);
    };

    const columns: ColumnsType<AttributeData> = [
        {
            title: 'Attribute Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            align: 'center',
            render: (_, record) => {
                const items = [
                    {
                        key: 'edit',
                        label: 'Edit',
                        icon: <EditOutlined />,
                        onClick: () => handleEdit(record),
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        icon: <DeleteOutlined />,
                        danger: true,
                        onClick: () => handleDelete(record.key),
                    },
                ];

                return (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <MasterDataSubPageLayout
            title="Material Attributes"
            onAdd={handleAdd}
            addButtonText="Add Attribute"
        >
            <div style={{ marginBottom: 24 }}>
                <Text type="secondary">
                    Manage the attributes used for material variations.
                </Text>
            </div>

            <Card bordered={false} style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16 }}>
                    <Title level={4}>Attributes</Title>
                    <Text type="secondary">A list of all material attributes.</Text>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </Card>

            <Modal
                title={editingKey ? "Edit Attribute" : "Add Attribute"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingKey ? "Update" : "Create"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <div className='flex secondary-text'>Create a new attribute to be used across materials.</div>
                    <Form.Item
                        name="name"
                        label="Attribute Name"
                        rules={[{ required: true, message: 'Please input the name of the attribute!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </MasterDataSubPageLayout>
    );
};

export default MaterialAttributes;

import React, { useState } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MasterDataSubPageLayout from '../../../components/common/MasterDataSubPageLayout';

const { Text, Title } = Typography;

interface MaterialData {
    key: string;
    name: string;
}

const Materials: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string | null>(null);

    const [data, setData] = useState<MaterialData[]>([]);

    const handleAdd = () => {
        setEditingKey(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: MaterialData) => {
        setEditingKey(record.key);
        form.setFieldsValue({ name: record.name });
        setIsModalOpen(true);
    };

    const handleDelete = (key: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this material?',
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
                const newData: MaterialData = { key: Date.now().toString(), name: values.name };
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

    const columns: ColumnsType<MaterialData> = [
        { title: 'Material Name', dataIndex: 'name', key: 'name' },
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
        <MasterDataSubPageLayout title="Materials" onAdd={handleAdd} addButtonText="Add Material">
            <div style={{ marginBottom: 24 }}><Text type="secondary">Manage raw materials and components.</Text></div>
            <Card bordered={false} style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16 }}><Title level={4}>Materials</Title><Text type="secondary">A list of all materials.</Text></div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
            <Modal
                title={editingKey ? "Edit Material" : "Add Material"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingKey ? "Update" : "Create"}
            >
                <Form form={form} layout="vertical"><Form.Item name="name" label="Material Name" rules={[{ required: true }]}><Input /></Form.Item></Form>
            </Modal>
        </MasterDataSubPageLayout>
    );
};

export default Materials;

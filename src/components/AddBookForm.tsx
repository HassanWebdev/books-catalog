"use client";

import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import "@/styles/custom-antd.css";

export interface AddBookValues {
  title: string;
  author: string;
  genre: string;
}

interface AddBookFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: AddBookValues) => Promise<void> | void;
  loading: boolean;
}

export function AddBookForm({
  open,
  onCancel,
  onSubmit,
  loading,
}: AddBookFormProps) {
  const [form] = Form.useForm<AddBookValues>();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleFinish = async (values: AddBookValues) => {
    await onSubmit(values);
    form.resetFields();
    onCancel();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter book title" }]}
      >
        <Input placeholder="Enter book title" />
      </Form.Item>

      <Form.Item
        label="Author"
        name="author"
        rules={[{ required: true, message: "Please enter author name" }]}
      >
        <Input placeholder="Enter author name" />
      </Form.Item>

      <Form.Item
        label="Genre"
        name="genre"
        rules={[{ required: true, message: "Please enter book genre" }]}
      >
        <Input placeholder="Enter book genre" />
      </Form.Item>

      <Form.Item>
        <div className="flex gap-2 justify-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Book
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default AddBookForm;

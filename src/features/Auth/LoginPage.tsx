'use client';
import React from "react";
import { Form, Input, Button, Typography, Card, Divider } from "antd";
import type { Rule } from "antd/es/form";
import { Loader2 } from "lucide-react";
import { useEmailPasswordLogin } from "./hooks/useEmailPasswordLogin";
import { useGoogleLogin } from "./hooks/useGoogleLogin";

const { Title } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

const inputConfigs: {
  name: keyof LoginFormValues;
  label: string;
  type: "email" | "password";
  rules: Rule[];
}[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    rules: [
      { required: true, message: "Email is required" },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
    ],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    rules: [
      { required: true, message: "Password is required" },
      { min: 6, message: "Minimum 6 characters" },
    ],
  },
];

export default function LoginPage() {
  const { login: loginWithEmail, isLoading: isEmailLoading } = useEmailPasswordLogin();
  const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();

  const onFinish = (values: LoginFormValues) => {
    loginWithEmail(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Title level={3} style={{ textAlign: "center", margin: 0 }}>
            Sign in
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            {inputConfigs.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {field.type === "password" ? (
                  <Input.Password placeholder={field.label} />
                ) : (
                  <Input type={field.type} placeholder={field.label} />
                )}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isEmailLoading}
                loading={isEmailLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {isEmailLoading && <Loader2 size={16} className="animate-spin" />}
                {isEmailLoading ? "Signing in" : "Sign in"}
              </Button>
            </Form.Item>
          </Form>

          <Divider plain style={{ margin: 0 }}>or</Divider>

          <Button
            block
            onClick={loginWithGoogle}
            disabled={isGoogleLoading}
            loading={isGoogleLoading}
          >
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}

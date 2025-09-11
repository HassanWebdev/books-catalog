"use client";
import React from "react";
import { Form, Input, Button, Typography, Card, Divider } from "antd";
import type { Rule } from "antd/es/form";
import { Loader2, Mail, Lock, LogIn, Chrome } from "lucide-react";
import { useEmailPasswordLogin } from "./hooks/useEmailPasswordLogin";
import { useGoogleLogin } from "./hooks/useGoogleLogin";

const { Title, Text } = Typography;

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
  const { login: loginWithEmail, isLoading: isEmailLoading } =
    useEmailPasswordLogin();
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
        padding: "16px",
        background: "linear-gradient(135deg, #8B4513 0%, #D2B48C 30%, #F5E6D3 70%, #FFF8DC 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: 20,
          boxShadow: "0 25px 70px rgba(139, 69, 19, 0.3)",
          background: 'linear-gradient(145deg, #FFF8DC 0%, #FFFAF0 50%, #FFF5EE 100%)',
          border: '1px solid #DDD6A7'
        }}
        bodyStyle={{ padding: "24px" }}
        className="responsive-login-card"
      >
        <style jsx global>{`
          @media (min-width: 768px) {
            .responsive-login-card .ant-card-body {
              padding: 40px !important;
            }
          }
          @media (max-width: 480px) {
            .responsive-login-card .ant-card-body {
              padding: 20px !important;
            }
          }
        `}</style>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: '#92400e',
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: 'clamp(24px, 5vw, 32px)',
                marginBottom: '8px'
              }}
            >
              Welcome to Book Catalog
            </Title>
            <Text 
              style={{ 
                fontSize: 'clamp(14px, 3vw, 18px)',
                color: '#B45309',
                fontFamily: "'Crimson Text', 'Georgia', serif"
              }}
            >
              Sign in to access your personal library
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            {inputConfigs.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={
                  <span style={{ 
                    color: '#92400e', 
                    fontWeight: '600',
                    fontSize: '16px',
                    fontFamily: "'Crimson Text', 'Georgia', serif"
                  }}>
                    {field.label}
                  </span>
                }
                rules={field.rules}
              >
                {field.type === "password" ? (
                  <Input.Password
                    size="large"
                    placeholder={field.label}
                    prefix={<Lock size={16} style={{ color: '#B45309' }} />}
                    autoComplete="current-password"
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #D97706',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      fontFamily: "'Crimson Text', 'Georgia', serif",
                      height: 'clamp(40px, 8vw, 50px)'
                    }}
                  />
                ) : (
                  <Input
                    size="large"
                    type={field.type}
                    placeholder={field.label}
                    prefix={<Mail size={16} style={{ color: '#B45309' }} />}
                    allowClear
                    autoComplete="email"
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #D97706',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      fontFamily: "'Crimson Text', 'Georgia', serif",
                      height: 'clamp(40px, 8vw, 50px)'
                    }}
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                icon={
                  isEmailLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <LogIn size={16} />
                  )
                }
                disabled={isEmailLoading}
                loading={isEmailLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "linear-gradient(90deg, #D97706, #B45309)",
                  border: 0,
                  borderRadius: '25px',
                  height: 'clamp(45px, 10vw, 50px)',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: '600',
                  fontFamily: "'Crimson Text', 'Georgia', serif",
                  boxShadow: "0 10px 24px rgba(217, 119, 6, 0.35)",
                  transition: 'all 0.2s ease'
                }}
                className="hover:scale-105"
              >
                {isEmailLoading ? "Signing in..." : "Sign in to Library"}
              </Button>
            </Form.Item>
          </Form>

          <Divider 
            plain 
            style={{ 
              margin: 0,
              color: '#B45309',
              fontFamily: "'Crimson Text', 'Georgia', serif",
              fontSize: 'clamp(14px, 2.5vw, 16px)'
            }}
          >
            or continue with
          </Divider>

          <Button
            size="large"
            block
            onClick={loginWithGoogle}
            disabled={isGoogleLoading}
            loading={isGoogleLoading}
            icon={<Chrome size={18} />}
            style={{
              background: "#ffffff",
              borderColor: "#D97706",
              color: "#92400e",
              boxShadow: "0 6px 16px rgba(217, 119, 6, 0.15)",
              borderRadius: '25px',
              height: 'clamp(45px, 10vw, 50px)',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '600',
              fontFamily: "'Crimson Text', 'Georgia', serif",
              border: '2px solid #D97706',
              transition: 'all 0.2s ease'
            }}
            className="hover:scale-105 hover:bg-amber-50"
          >
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}

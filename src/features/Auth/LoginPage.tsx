"use client";
import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Divider } from "antd";
import type { Rule } from "antd/es/form";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { useEmailPasswordLogin } from "./hooks/useEmailPasswordLogin";
import { useEmailPasswordRegister } from "./hooks/useEmailPasswordRegister";
import { useGoogleLogin } from "./hooks/useGoogleLogin";

const { Title, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
  name?: string;
};

const inputConfigs: {
  name: keyof LoginFormValues;
  label: string;
  type: "email" | "password" | "text";
  rules: Rule[];
}[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    rules: [
      { required: true, message: "Name is required" },
      { min: 2, message: "Name must be at least 2 characters" },
    ],
  },
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
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { login: loginWithEmail, isLoading: isEmailLoading } =
    useEmailPasswordLogin();
  const { register, isLoading: isRegisterLoading } = useEmailPasswordRegister();
  const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();

  const onFinish = (values: LoginFormValues) => {
    if (isSignUpMode) {
      register(values).then((result) => {
        if (result?.success) {
          loginWithEmail({ email: values.email, password: values.password });
        }
      });
    } else {
      loginWithEmail(values);
    }
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

          .responsive-login-card .ant-input-affix-wrapper .ant-input,
          .responsive-login-card .ant-input-password .ant-input {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            outline: none !important;
          }
          .responsive-login-card .ant-input-affix-wrapper,
          .responsive-login-card .ant-input-password {
            box-shadow: none !important;
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
            {inputConfigs.map((field) => {
              // Show name field only in sign-up mode
              if (field.name === "name" && !isSignUpMode) {
                return null;
              }
              
              return (
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
                      prefix={field.name === "email" ? <Mail size={16} style={{ color: '#B45309' }} /> : null}
                      allowClear
                      autoComplete={field.name === "email" ? "email" : "name"}
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
              );
            })}

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="primary"
                  htmlType={!isSignUpMode ? "submit" : "button"}
                  size="large"
                  icon={
                    (!isSignUpMode && isEmailLoading) ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogIn size={16} />
                    )
                  }
                  disabled={isEmailLoading || isRegisterLoading}
                  loading={!isSignUpMode && isEmailLoading}
                  onClick={() => {
                    if (isSignUpMode) {
                      setIsSignUpMode(false);
                    }
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: !isSignUpMode ? "linear-gradient(90deg, #D97706, #B45309)" : "#f0f0f0",
                    border: !isSignUpMode ? 0 : "2px solid #D97706",
                    borderRadius: '25px',
                    height: 'clamp(45px, 10vw, 50px)',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '600',
                    fontFamily: "'Crimson Text', 'Georgia', serif",
                    boxShadow: !isSignUpMode ? "0 10px 24px rgba(217, 119, 6, 0.35)" : "none",
                    transition: 'all 0.2s ease',
                    color: !isSignUpMode ? "white" : "#D97706"
                  }}
                  className="hover:scale-105"
                >
                  Sign In
                </Button>
                
                <Button
                  type={isSignUpMode ? "primary" : "default"}
                  htmlType={isSignUpMode ? "submit" : "button"}
                  size="large"
                  icon={
                    (isSignUpMode && isRegisterLoading) ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogIn size={16} />
                    )
                  }
                  disabled={isEmailLoading || isRegisterLoading}
                  loading={isSignUpMode && isRegisterLoading}
                  onClick={() => {
                    if (!isSignUpMode) {
                      setIsSignUpMode(true);
                    }
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: isSignUpMode ? "linear-gradient(90deg, #D97706, #B45309)" : "#f0f0f0",
                    border: isSignUpMode ? 0 : "2px solid #D97706",
                    borderRadius: '25px',
                    height: 'clamp(45px, 10vw, 50px)',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '600',
                    fontFamily: "'Crimson Text', 'Georgia', serif",
                    boxShadow: isSignUpMode ? "0 10px 24px rgba(217, 119, 6, 0.35)" : "none",
                    transition: 'all 0.2s ease',
                    color: isSignUpMode ? "white" : "#D97706"
                  }}
                  className="hover:scale-105"
                >
                  Sign Up
                </Button>
              </div>
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
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
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

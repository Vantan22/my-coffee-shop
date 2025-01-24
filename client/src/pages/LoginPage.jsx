import {AuthLayout} from "@/layouts/AuthLayout";
import {Button, Form, Input, message, Space, Typography} from "antd";
// import { auth } from "@/firebase/config";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";

const {
  Title,
  Text,
} = Typography;

export const LoginPage = () =>
  {
  const [loading, setLoading] = useState(false);
  const {
    user,
    login,
  } = useAuth();
  // console.log(user);

  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  const onFinish = async(values) =>
    {
    setLoading(true);
    try
      {
      await login(values.userName, values.password);
      message.success("Đăng nhập thành công");
      }
    catch (error)
      {
      // setLoading(false);
      message.error("Đăng nhập thất bại: " + error.message);
      }
    finally
      {
      setLoading(false);
      }
    };

  return (
      <AuthLayout>
        <div style={ {
          textAlign: "center",
          marginBottom: "2rem",
        } }>
          <Title level={ 3 }>Đăng nhập</Title>
          <Text type="secondary">
            Chưa có tài khoản?{ " " }
            <Link to="/register" style={ {color: "#00b96b"} }>
              Đăng ký ngay
            </Link>
          </Text>
        </div>

        <Form
            name="login"
            layout="vertical"
            onFinish={ onFinish }
            autoComplete="off"
        >
          <Form.Item
              label="userName"
              name="userName"
              rules={ [
                {
                  required: true,
                  message: "Vui lòng nhập userName!",
                }] }
          >
            <Input placeholder="Nhập userName của bạn" size="large" />
          </Form.Item>

          <Form.Item
              label="Mật khẩu"
              name="password"
              rules={ [
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              ] }
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" size="large" />
          </Form.Item>

          <Space direction="vertical" size="middle" style={ {width: "100%"} }>
            <Button
                type="primary"
                htmlType="submit"
                loading={ loading }
                block
                size="large"
            >
              Đăng nhập
            </Button>
            <Link to="/forgot-password">
              <Button type="link" block>
                Quên mật khẩu?
              </Button>
            </Link>
          </Space>
        </Form>
      </AuthLayout>
  );
  };

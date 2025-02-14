import { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Layout, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { MenuItem } from '@/components/menu/MenuItem.jsx'; // import { images } from "@/assets/index";
// import { images } from "@/assets/index";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  const handleUserMenuClick = async ({ key }) => {
    if (key === 'logout') {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'settings') {
      navigate('/settings');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={isMobile ? true : collapsed}
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          display: isMobile && !collapsed ? 'none' : 'block',
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          {/*<img*/}
          {/*  src={images.logo}*/}
          {/*  alt="Logo"*/}
          {/*  loading="eager"*/}
          {/*  style={{*/}
          {/*    height: "32px",*/}
          {/*    width: "auto",*/}
          {/*  }}*/}
          {/*/>*/}
          <span
            style={{
              color: '#00b96b',
              fontSize: '24px',
              marginLeft: '8px',
              fontWeight: 'bold',
            }}
          >
            Go Caphe
          </span>
        </div>
        <MenuItem />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'rgba(255, 255, 255, 0.87)',
            boxShadow: '0 2px 8px 0 rgba(29,35,41,.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ paddingRight: 24 }}>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
              arrow
            >
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Avatar icon={<UserOutlined />} />
                <span
                  style={{
                    display: isMobile ? 'none' : 'inline-block',
                    padding: '0 8px',
                  }}
                >
                  {/*{user?.email}*/}
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? '16px' : '24px',
            // padding: 24,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflowX: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

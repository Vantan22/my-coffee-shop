import { Menu } from 'antd';
import {
  ClockCircleOutlined,
  DashboardOutlined,
  DollarOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const MenuItem = ({ icon, label, path }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
      path: '/dashboard',
    },
    {
      key: 'orders',
      icon: <TableOutlined />,
      label: 'Danh sách bàn',
      path: '/orders',
    },
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: 'Inventory',
      children: [
        {
          key: 'products',
          icon: <ProjectOutlined />,
          label: 'Products',
          path: '/products',
        },
        {
          key: 'ingredients',
          icon: <ProjectOutlined />,
          label: 'Ingredients',
          path: '/ingredients',
        },
        {
          key: 'categories',
          icon: <ProjectOutlined />,
          label: 'Categories',
          path: '/categories',
        },
      ],
    },
    {
      key: 'tasks',
      icon: <ScheduleOutlined />,
      label: 'Công việc',
      path: '/tasks',
    },
    {
      key: 'timesheet',
      icon: <ClockCircleOutlined />,
      label: 'Chấm công',
      path: '/timesheet',
    },
    {
      key: 'income',
      icon: <DollarOutlined />,
      label: 'Thu nhập',
      path: '/income',
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const findMenuItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const handleMenuClick = ({ key }) => {
    console.log('key', key);
    const menuItem = findMenuItemByKey(menuItems, key);
    console.log('menuItem', menuItem);
    if (menuItem && menuItem.path) {
      navigate(menuItem.path);
    }
  };

  const findSelectedKeys = (items, pathname) => {
    let keys = [];
    for (const item of items) {
      if (item.path && pathname.startsWith(item.path)) {
        keys.push(item.key);
      }
      if (item.children) {
        keys = keys.concat(findSelectedKeys(item.children, pathname));
      }
    }
    return keys;
  };

  const selectedKeys = findSelectedKeys(menuItems, location.pathname);

  const findOpenKeys = (items, pathname, parentKeys = []) => {
    for (const item of items) {
      if (item.path && pathname.startsWith(item.path)) {
        return parentKeys; // Trả về các parent keys nếu tìm thấy path phù hợp
      }
      if (item.children) {
        const found = findOpenKeys(item.children, pathname, [
          ...parentKeys,
          item.key,
        ]);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const defaultOpenKeys = findOpenKeys(menuItems, location.pathname) || [];

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={selectedKeys}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};

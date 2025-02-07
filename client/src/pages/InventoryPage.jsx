import { App, Button, Col, Row, Space, Typography } from 'antd';
import TabsExample from '@/components/ui/tabs.jsx';

const { Title } = Typography;
export const InventoryPage = () => {
  const { message, notification, modal } = App.useApp();
  const buttonClick = () => {
    message.success('Good!');
    notification.info({ message: 'Good' });
    modal.success({ title: 'Good' });
  };
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Tổng quan</Title>
          <TabsExample />
        </Col>
        <Col>
          <Button onClick={buttonClick}>Thêm</Button>
        </Col>
      </Row>
    </Space>
  );
};

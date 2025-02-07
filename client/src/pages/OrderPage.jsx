import { App, Button, Card, Col, Flex, Row, Space, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { cardVariants } from '@/utils/animations.js';
import TabsExample from '@/components/ui/tabs.jsx';
import { useState } from 'react';

const { Title } = Typography;
export const OrderPage = () => {
  const MotionCard = motion(Card);
  const { message, notification, modal } = App.useApp();

  const [openDetail, setOpenDetail] = useState(false);
  const buttonClick = () => {
    message.success('Good!');
    notification.info({ message: 'Good' });
    modal.success({ title: 'Good' });
  };
  const toggleDetail = () => setOpenDetail(!openDetail);

  return (
    <>
      <Card style={{ marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Danh sách bàn</h1>
      </Card>
      <Flex style={{ width: '100%' }} gap="large">
        <Card style={{ flex: '1' }}>
          <Button onClick={toggleDetail}>Toggle</Button>
        </Card>
        {openDetail && (
          <AnimatePresence>
            <MotionCard
              variants={cardVariants} // Dùng variants đã tạo
              initial="hidden" // Trạng thái ban đầu
              animate="visible" // Khi hiện ra
              exit="exit" // Khi biến mất
            >
              <Flex>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <h1>OrderPage</h1>
                </Space>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={4}>Danh sách Bàn</Title>
                      <TabsExample />
                    </Col>
                    <Col>
                      <Button onClick={buttonClick}>Thêm</Button>
                    </Col>
                  </Row>
                </Space>
              </Flex>
            </MotionCard>
          </AnimatePresence>
        )}
      </Flex>
    </>
  );
};

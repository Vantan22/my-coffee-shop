import { Col, Input, Row, Space, Typography } from 'antd';
import { BaseTable } from '@/components/BaseTable/BaseTable.jsx';

const { Search } = Input;

const { Title } = Typography;
export const CategoryPage = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            loading
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col>
          <Title level={4}>Tổng quan</Title>
        </Col>
      </Row>

      {/*<Row style={{ width: '100%' }}>*/}
      {/*  <Col>*/}
      <BaseTable />
      {/*  </Col>*/}
      {/*</Row>*/}
    </Space>
  );
};

import { Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const BaseTable = () => {
  const tableProps = {
    bordered: true,
    loading: false,
    pagination: true,
    // size: 'large',
    expandable: true,
    // title: true,
    showHeader: true,
    // footer: true,
    rowSelection: true,
    scroll: true,
    tableLayout: 'unset',
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      sorter: true,
      render: () => (
        <Space size="middle">
          <a>Delete</a>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a>
        </Space>
      ),
    },
  ];
  const data = Array.from({
    length: 10,
  }).map((_, i) => ({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  }));
  return (
    <Table
      {...tableProps}
      size="large"
      pagination={{
        position: ['bottomCenter'],
      }}
      columns={columns}
      dataSource={data || []}
      scroll={scroll}
    />
  );
};

import React from 'react';
import { Segmented, Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];
const TabsExample = () => {
  const [alignValue, setAlignValue] = React.useState('All');
  return (
    <>
      <Segmented
        value={alignValue}
        style={{
          marginBottom: 8,
        }}
        onChange={setAlignValue}
        options={['All', 'Product', 'ingredient']}
      />
    </>
  );
};
export default TabsExample;

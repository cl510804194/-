/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Card, Input, Button, Message } from '@alifd/next';
import styled from 'styled-components';
import stores from '../../../../stores/index';
import { jkAdd } from '../../../../api/search';

const Wrapper = styled.div`
  text-align: center;
  /* margin-top: 40px; */
`;
const commonProps = {
  style: { width: 300 },
  title: '监测',
  subTitle: '请输入监测',
};
export default function JkCard() {
  const todos = stores.useStore('todos');
  const { dataSource, add } = todos;
  const [data, setdata] = useState('');
  const handleChange = v => {
    setdata(v);
  };
  const handleButton = () => {
    jkAdd(data)
      .then(res => {
        Message.success('监测成功');
      })
      .catch(err => {
        Message.error('已监测该股票');
      });
  };
  return (
    <Card {...commonProps} contentHeight="auto">
      <Wrapper className="custom-content">
        <p>股票代码</p>
        <Input size="large" onChange={handleChange} />
        <Button onClick={handleButton} size="large" type="primary">
          确定
        </Button>
      </Wrapper>
    </Card>
  );
}

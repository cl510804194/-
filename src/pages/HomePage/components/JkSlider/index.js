/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Card, Slider } from '@alifd/next';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  /* margin-top: 40px; */
`;
const commonProps = {
  style: { width: 300 },
  title: '监测列表',
  subTitle: '监控列表信息',
};
export default function JkCard({ dataSource }) {
  const sliders = dataSource.map((item, index) => {
    return <div key={index}>{item.gid}</div>;
  });
  return (
    <Card {...commonProps} contentHeight="auto">
      <Slider slidesToShow={3} arrows={false} slideDirection="ver" dots={false}>
        {sliders}
      </Slider>
    </Card>
  );
}

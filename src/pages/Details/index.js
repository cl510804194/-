import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { Message, Table } from '@alifd/next';
import styled from 'styled-components';
import { zhzs } from '../../api/zhzs';
import { search } from '../../api/search';
import stores from '../../stores/index';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 auto;
  width: 80%;
`;
const ListItem = styled.li`
  justify-content: space-around;
  padding: 20px;
  width: 15%;
`;
const Title = styled.p`
  text-align: center;
  font-weight: 800;
  font-size: 20px;
`;
const TableBox = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const config = {
  gt1: '今开',
  gt2: '最高',
  gt3: '增跌幅',
  gt4: '换手',
  gt5: '成交量',
  gt7: '昨收',
  gt8: '最低',
  gt9: '增跌额',
  gt10: '振幅',
  gt11: '成交额',
  gid: '股票代码',
  name: '股票名称'
};
export default function Index({ match }) {
  const [data, setdata] = useState({});
  const [history, sethistory] = useState([]);
  const todos = stores.useStore('todos');
  useEffect(() => {
    console.log(1);
    zhzs(match.params.id)
      .then(res => {
        setdata(res.data);
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          Message.error(err.response.data.error);
        } else {
          Message.error('异常错误');
        }
      });
    search(match.params.id)
      .then(res => {
        sethistory(res.data);
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          Message.error(err.response.data.error);
        } else {
          Message.error('异常错误');
        }
      });
  }, [match.params.id]);
  // const renderItem = Object.keys(data).forEach((item, index) => {
  //   console.log(1);

  //   return <ListItem key={index}>{config[item]}:data[item]</ListItem>;
  // });
  const renderItem = () => {
    if (Object.keys(data) != 0) {
      return Object.keys(data).map((item, index) => {
        // debugger;
        return (
          <ListItem key={index}>
            {config[item]}:{data[item]}
          </ListItem>
        );
      });
    }
  };
  return (
    <div>
      <Title>{data.name}</Title>
      <List>{Object.keys(data) != 0 ? renderItem() : <div>暂无数据</div>}</List>
      <Title>历史记录</Title>
      <TableBox>
        <Table dataSource={history}>
          <Table.Column title="价格" dataIndex="price" />
          <Table.Column title="涨跌" dataIndex="km1" />
          <Table.Column title="涨跌幅" dataIndex="km2" />
          <Table.Column title="时间" dataIndex="time" />
        </Table>
      </TableBox>
    </div>
  );
}

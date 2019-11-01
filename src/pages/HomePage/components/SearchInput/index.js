/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Message, Icon } from '@alifd/next';
import styled from 'styled-components';
import stores from '../../../../stores/index';
import { search, jkAdd, jkGet } from '../../../../api/search';
// import { jkGet } from '../../api/search';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 40px;
  /* margin-top: 40px; */
`;
const Item = styled.div`
  width: 350px;
  > p {
    text-align: center;
    font-weight: 800;
    font-size: 18px;
  }
  > div {
    display: flex;
    justify-content: center;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
`;
const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    list-style: none;
    width: 40%;
  }
  li:hover {
    cursor: pointer;
    color: red;
  }
`;
export default function GpCard({ dataList }) {
  const todos = stores.useStore('todos');
  const { dataSource, add } = todos;
  const [detailsList, setdetailsList] = useState([]);
  const [data, setdata] = useState('');
  const [jkData, setjkData] = useState(``);
  const [jkList, setjkList] = useState([]);

  // 获取搜索接口并且绑定定时器
  useEffect(() => {
    setjkList(dataList);
  }, [dataList, detailsList]);
  const setinSearch = (data, time) => {
    search(data).then(res => {
      if (res.data.length < 15) {
        Message.error('当前爬取的股票数据过少,请稍后再试');
        return;
      }
      add(res.data, data);
      setInterval(() => {
        search(data)
          .then(res => {
            add(res.data, data);
          })
          .catch(err => {});
      }, time * 1000);
    });
  };

  // 搜索
  const searchChange = v => {
    setdata(v);
  };
  // 监测
  const jkChange = v => {
    setjkData(v);
  };
  // 提交搜索
  const handleSearch = () => {
    setinSearch(data, 60);
    // 提交监控
  };
  const handleJk = () => {
    if (jkData == '') {
      Message.error('股票代码不能为空');
      return;
    }
    jkAdd(jkData)
      .then(res => {
        Message.success('监测成功');
        jkGet().then(res1 => {
          setjkList(res1.data);
        });
      })
      .catch(err => {
        Message.error('已监测该股票');
      });
  };
  // 点击添加详细信息
  const addDetail = e => {
    const target = e.target.innerHTML;

    if (detailsList.includes(target)) {
      const newList = detailsList;
      newList.splice(newList.findIndex(v => v == target), 1);
      setdetailsList(newList);
      todos.del(target);
      debugger;
    } else {
      const newList = detailsList;
      newList.push(target);
      setdetailsList(newList);
      setinSearch(target, 60);
    }
    // console.log(e.target.innerHTML);
  };

  const renderList = () => {
    return jkList.map((item, index) => {
      return (
        <li style={detailsList.includes(item.gid) ? { color: 'red' } : { color: '#000' }} onClick={addDetail} key={index}>
          {item.gid}
        </li>
      );
    });
  };
  return (
    <Card className="free-card custom" free>
      <Wrapper>
        <ItemWrapper>
          <Item>
            <p>监测</p>
            <div>
              <Input placeholder="请输入要监测的股票代码" size="small" onChange={jkChange} />
              <Button onClick={handleJk} size="small" type="primary">
                <Icon type="add" />
              </Button>
            </div>
          </Item>
          <Item>
            <p>查询</p>
            <div>
              <Input placeholder="请输入要查询的股票代码" size="small" onChange={searchChange} />
              <Button onClick={handleSearch} size="small" type="primary">
                <Icon type="search" />
              </Button>
            </div>
          </Item>
        </ItemWrapper>

        <div className="free-card-main">
          <Card.Header title="监控列表" subTitle="点击下方股票代码可展示详细信息" />
          <Card.Divider />
          <Card.Content>
            <ListWrapper>{renderList()}</ListWrapper>
          </Card.Content>
        </div>
      </Wrapper>
    </Card>
    // <Card {...commonProps} contentHeight="auto">
    //   <Wrapper className="custom-content">
    //     <p>股票代码</p>
    //     <Input size="large" onChange={handleChange} />
    //     <Button onClick={handleButton} size="large" type="primary">
    //       确定
    //     </Button>
    //   </Wrapper>
    // </Card>
  );
}

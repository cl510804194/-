import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@alifd/next';
import ReactEcharts from 'echarts-for-react';
import stores from '../../../../stores/index';
import { Title } from '../../style';

const Wrapper = styled.div`
  text-align: center;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const cols = {
  time: {
    range: [0, 1],
  },
};
function Index({ gid, dataSource, history }) {
  const todos = stores.useStore('todos');
  const [data, setdata] = useState([]);
  const [dataList, setdataList] = useState({});
  useEffect(() => {
    console.log(gid);
    const newDataSource = dataSource.map((item, index) => {
      const newItem = item;
      newItem.price = parseFloat(item.price, 10);
      newItem.km1 = parseFloat(item.km1, 10);
      newItem.km2 = parseFloat(item.km2, 10);
      return newItem;
    });
    const time = [];
    const km1 = [];
    const km2 = [];
    const price = [];
    newDataSource.map((item, index) => {
      time.push(item.time);
      km1.push(item.km1);
      km2.push(item.km2);
      price.push(item.price);
    });
    const newList = {};
    newList.time = time;
    newList.km1 = km1;
    newList.km2 = km2;
    newList.price = price;
    setdataList(newList);
    setdata(newDataSource);
    // debugger;
  }, [dataSource, gid]);
  const cancleChart = () => {
    todos.del(gid);
  };
  const toDetails = () => {
    history.push(`/zhzs/${gid}`);
  };
  const getOption = () => {
    return {
      title: {
        text: dataSource[0].name,
      },
      tooltip: {
        trigger: 'axis',
      },
      // legend: {
      //   data: ['价格', '增幅', '增幅比例'],
      // },
      grid: {
        left: '7%',
        right: '10%',
        bottom: '9%',
        // containLabel: true,
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          start: 94,
          end: 100,
          handleSize: 8,
        },
        {
          type: 'inside',
          start: 94,
          end: 100,
        },
      ],

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataList.time,
      },
      yAxis: [
        // {
        //   type: 'value',
        //   positon: 'left',
        //   name: '价格',
        //   min: 'dataMin',
        //   max: 'dataMax',
        // },
        {
          type: 'value',
          name: '价格',
          min: 'dataMin',
          max: 'dataMax',
          // max: 500
        },
        {
          type: 'value',
          name: '增跌',
          // max: 500
        },
        {
          type: 'value',
          name: '比例',
          axisLabel: {
            formatter(value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              const newValue = value * 100;
              return `${newValue}%`;
            },
          },

          min: 'dataMin',
          offset: 60,
          // max: 500
        },
        // {
        //   type: 'value',
        //   positon: 'right',
        //   name: '增跌比例',

        //   // max: 500
        // },
      ],
      series: [
        {
          name: '价格',
          type: 'line',
          tooltip: {
            trigger: 'axis',
          },
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
          },
          yAxisIndex: 0,
          smooth: true,
          data: dataList.price,
        },
        {
          name: '增跌',
          type: 'line',
          tooltip: {
            trigger: 'axis',
          },
          markPoint: {
            // data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
          },
          yAxisIndex: 1,
          smooth: true,
          data: dataList.km1,
        },
        {
          name: '增跌比例',
          type: 'line',
          tooltip: {
            trigger: 'axis',
          },
          markPoint: {
            // data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
          },
          yAxisIndex: 2,
          smooth: true,
          data: dataList.km2,
        },

        // {
        //   name: '增幅比例',
        //   type: 'line',

        //   data: dataList.km2,
        // },
      ],
    };
  };
  return (
    <div>
      {/* <Title>{dataSource[0].name}</Title> */}
      <ReactEcharts notMerge lazyUpdate option={getOption()} />
      <Wrapper>
        <Button type="primary" onClick={toDetails}>
          详情
        </Button>
        <Button type="secondary" onClick={cancleChart}>
          取消
        </Button>
      </Wrapper>
    </div>
  );
}
export default withRouter(Index);

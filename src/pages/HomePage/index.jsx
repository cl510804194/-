import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Jkinput from './components/Jkinput';
import ChartStock from './components/ChartStock';
import SearchInput from './components/SearchInput';
import JkSlider from './components/JkSlider';
import stores from '../../stores/index';
import { jkGet } from '../../api/search';

const Wrapper = styled.div`
  /* text-align: center; */
  padding: 40px;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function HomePage() {
  const todos = stores.useStore('todos');
  const { dataSource, add } = todos;

  const [jkList, setjkList] = useState([]);
  const renderChart = dataSource.map(item => {
    return <ChartStock key={item.gid} gid={item.gid} dataSource={item.data} />;
  });
  useEffect(() => {
    jkGet().then(res => {
      setjkList(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <SearchBox>
        {' '}
        {/* <Jkinput /> */}
        <SearchInput dataList={jkList} />
        {/* <JkSlider dataSource={jkList} /> */}
      </SearchBox>

      {renderChart}
    </Wrapper>
  );
}

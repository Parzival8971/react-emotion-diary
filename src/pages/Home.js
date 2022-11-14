import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';
import MyCountScore from '../components/MyCountScore';

import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const allCount = data.length;
  const goodCount = data.filter((el) => el.emotion > 3).length;
  const badCount = data.length - goodCount;

  return (
    <div className='HomePage'>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton text={<BiChevronLeft />} onClick={decreaseMonth} />
        }
        rightChild={
          <MyButton text={<BiChevronRight />} onClick={increaseMonth} />
        }
      />
      <div className='home_page_inner'>
        <MyCountScore
          allCount={allCount}
          goodCount={goodCount}
          badCount={badCount}
        />
        <DiaryList diaryList={data} />
      </div>
    </div>
  );
};

export default Home;

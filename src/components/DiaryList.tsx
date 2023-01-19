import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';
import { DiaryItemType } from '../redux/modules/items';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '모든 감정' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' },
];

<<<<<<< HEAD:src/components/DiaryList.tsx
type PropsTypeControlMenu = {
  value: string;
  onChange: (v: string) => void;
  optionList: {
    value: string;
    name: string;
  }[];
};
=======
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  useEffect(() => {
    console.log('컨트롤메뉴?');
  }, []);
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});
>>>>>>> main:src/components/DiaryList.js

const ControlMenu = React.memo(
  ({ value, onChange, optionList }: PropsTypeControlMenu) => {
    return (
      <select
        className='ControlMenu'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {optionList.map((it, idx) => (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    );
  }
);

type PropsType = {
  diaryList: DiaryItemType[];
};

const DiaryList = ({ diaryList }: PropsType) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>('latest');
  const [filter, setFilter] = useState<string>('all');

  const getProcessedDiaryList = () => {
    const filterCallBack = (item: { emotion: string }): boolean => {
      if (filter === 'good') {
        return parseInt(item.emotion) < 3;
      } else {
        return parseInt(item.emotion) >= 3;
      }
    };

    const compare = (a: { date: string }, b: { date: string }) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === 'all'
        ? copyList
        : copyList.filter((it: { emotion: string }) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  // console.log(getProcessedDiaryList());
  // console.log(diaryList);

  return (
    <div className='DiaryList'>
      <h4>정렬</h4>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            type={'positive'}
            text={'새 일기쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      <div className='diaryitem_wrapper'>
        {getProcessedDiaryList().map(
          (it: JSX.IntrinsicAttributes & DiaryItemType) => (
            // <div key={it.id}>
            //   {it.content} {it.emotion}
            // </div>
            <DiaryItem key={it.id} {...it} />
          )
        )}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

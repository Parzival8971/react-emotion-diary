import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);
    }
  }, [id, diaryList]);

  return <div>Diary</div>;
};

export default Diary;

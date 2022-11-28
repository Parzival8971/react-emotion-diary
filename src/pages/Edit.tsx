import { useState, useEffect } from 'react';
// import {useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules/reudcer';
import { DiaryItemType } from '../redux/modules/items';

const Edit = () => {
  const [originData, setOriginData] = useState<DiaryItemType>();
  const navigate = useNavigate();
  const { id } = useParams();

  // const diaryList = useContext(DiaryStateContext);
  const diaryList = useSelector((state: RootState) => state.items);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기 수정`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      // const targetDiary = diaryList.find(
      //   (it) => parseInt(it.id) === parseInt(id)
      // );
      const targetDiary = diaryList.find(
        (it: { id: string | undefined }) => it.id === id
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  return (
    <div className='EditPage'>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;

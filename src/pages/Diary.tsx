import React, { useEffect, useState } from 'react';
// import { useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { DiaryStateContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

import { BiEditAlt, BiArrowBack } from 'react-icons/bi';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules/reudcer';
import { DiaryItemType } from '../redux/modules/items';

const Diary = () => {
  const { id } = useParams();
  // const diaryList = useContext(DiaryStateContext);
  const diaryList = useSelector((state: RootState) => state.items);

  const navigate = useNavigate();
  const [data, setData] = useState<DiaryItemType>();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      // const targetDiary = diaryList.find(
      //   (it) => parseInt(it.id) === parseInt(id)
      // );
      const targetDiary = diaryList.find(
        (it: { id: string | undefined }): boolean => it.id === id
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList, navigate]);
  if (!data) {
    return <div className='DiaryPage'>로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => it.emotion_id === data.emotion
    );

    return (
      <div>
        <div className='DiaryPage'>
          <MyHeader
            headText={`${getStringDate(new Date(data.date))} 감정`}
            leftChild={
              <MyButton text={<BiArrowBack />} onClick={() => navigate(-1)} />
            }
            rightChild={
              <MyButton
                text={<BiEditAlt />}
                onClick={() => navigate(`/edit/${data.id}`)}
              />
            }
          />
          <article>
            <section>
              {/* <h4>{getStringDate(new Date(data.date))}</h4> */}
              <div
                className={[
                  'diary_img_wrapper',
                  `diary_img_wrapper_${data.emotion}`,
                ].join(' ')}
              >
                <img
                  src={curEmotionData!.emotion_img}
                  alt={curEmotionData!.emotion_descript}
                />
                <div className='emotion_descript'>
                  # {curEmotionData!.emotion_descript}
                </div>
              </div>
            </section>
            <section>
              <h4>오늘의 감정일기</h4>
              <div className='diary_content_wrapper'>
                <p>{data.content}</p>
              </div>
            </section>
            <section>
              <div className='img_wrapper'>
                {data.images && <h4 className='today_emotion'>오늘의 추억</h4>}
                {data.images && (
                  <img src={data.images} className='thumbNail' alt='이미지' />
                )}
              </div>
            </section>
          </article>
        </div>
      </div>
    );
  }
};

export default Diary;

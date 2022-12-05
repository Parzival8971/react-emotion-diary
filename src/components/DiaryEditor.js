import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { DiaryDispatchContext } from '../App';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

import { BiTrash, BiArrowBack, BiCheck, BiImageAdd, BiX } from 'react-icons/bi';

import { useDispatch } from 'react-redux';
import { createItem, editItem, removeItem } from '../redux/modules/items';
import shortId from 'shortid';

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [images, setImages] = useState('');

  const photoInput = useRef();

  // const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const dispatch = useDispatch();

  // 이미지 삽입부분 아직 이해가 안됨. 공부!!
  const handleImages = useCallback((e) => {
    e.preventDefault();
    // 읽어오기
    const reader = new FileReader();
    // 선택한 값
    reader.readAsDataURL(e.target.files[0]);
    // 로딩
    reader.onload = () => {
      setImages(reader.result);
      // setImages(e.target.result);
    };
  }, []);

  const deleteImage = () => {
    setImages('');
  };

  const handleClick = useCallback(() => {
    photoInput.current.click();
  }, []);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const dataId = shortId.generate();
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        // creonCreate(date, content, emotion, images)
        dispatch(createItem(dataId, date, content, emotion, images));
      } else {
        // onEdit(originData.id, date, content, emotion, images);
        dispatch(editItem(originData.id, date, content, emotion, images));
      }
    }
    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // onRemove(originData.id);
      dispatch(removeItem(originData.id));
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
      setImages(originData.images);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
        leftChild={
          <MyButton text={<BiArrowBack />} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={<BiTrash />}
              BiTrash
              type={'negative'}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4 className='today_date'>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='date'
            />
          </div>
        </section>
        <section>
          <h4 className='today_emotion'>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((it) => {
              return (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmote}
                  isSelected={it.emotion_id === emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4 className='today_diary'>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              placeholder='오늘은 어땠나요?'
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='img_wrapper'>
            {images && <h4 className='today_emotion'>오늘의 추억</h4>}
            {images && <img src={images} className='thumbNail' alt='이미지' />}
          </div>
          <div className='control_box'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImages}
              ref={photoInput}
              style={{ display: 'none' }}
            />
            <MyButton
              for='file'
              text={<BiImageAdd />}
              type={'default'}
              onClick={handleClick}
            />
            {images && (
              <MyButton text={<BiX />} type={'default'} onClick={deleteImage} />
            )}
            <MyButton
              text={<BiCheck />}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default DiaryEditor;

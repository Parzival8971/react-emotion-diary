import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정일기장 - 새 일기`;
  }, []);

  return (
    <div className='NewPage'>
      <DiaryEditor
        isEdit={false}
        originData={{
          id: '',
          date: '',
          content: '',
          emotion: 0,
          images: '',
        }}
      />
    </div>
  );
};

export default New;

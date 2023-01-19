import React from 'react';

type PropsType = {
  emotion_id: number;
  emotion_img: string;
  emotion_descript: string;
  onClick: (i: number) => void;
  isSelected: boolean;
};
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}: PropsType) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        'EmotionItem',
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(' ')}
    >
      <img src={emotion_img} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);

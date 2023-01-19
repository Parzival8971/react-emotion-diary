import React from 'react';

interface PropsType {
  text: JSX.Element | string;
  type: 'positive' | 'negative' | 'cancel' | 'default';
  onClick: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

const MyButton = ({ text, type, onClick }: PropsType) => {
  const btnType = ['positive', 'negative', 'cancel'].includes(type)
    ? type
    : 'default';

  return (
    <button
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: 'default',
};

export default MyButton;

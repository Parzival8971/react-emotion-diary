import React, { ReactNode } from 'react';

type PropsType = {
  headText: string;
  leftChild: ReactNode;
  rightChild: ReactNode;
};

const MyHeader = ({ headText, leftChild, rightChild }: PropsType) => {
  return (
    <header>
      <div className='head_btn_left'>{leftChild}</div>
      <div className='head_text'>{headText}</div>
      <div className='head_btn_right'>{rightChild}</div>
    </header>
  );
};

export default MyHeader;

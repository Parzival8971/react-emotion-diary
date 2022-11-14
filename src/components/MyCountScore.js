import React from 'react';

const MyCountScore = ({ allCount, goodCount, badCount }) => {
  return (
    <div className='MyCountScore'>
      <h4>요약</h4>
      <div className='count_score_wrapper'>
        <div className='count'>
          <h4>{allCount}</h4>
          <p>모든 감정</p>
        </div>
        <div className='count'>
          <h4>{goodCount}</h4>
          <p>좋은 감정</p>
        </div>
        <div className='count'>
          <h4>{badCount}</h4>
          <p>안좋은 감정</p>
        </div>
      </div>
    </div>
  );
};

export default MyCountScore;

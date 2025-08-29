import React from 'react';

const Card = () => {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img alt="robot" src={`https://robohash.org/test?200x200`} />
      <div>
        <h2>Austin Sayaovong</h2>
        <p>YSayaovong@gmail.com</p>
      </div>
    </div>
  );
};

export default Card;
